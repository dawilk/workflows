#!/usr/bin/env npx ts-node
import { promises as fs } from "fs";
import * as yaml from "js-yaml";
import { extname, join } from "path";
import { endGroup, error, info, setFailed, startGroup } from '@actions/core';
import { getMarkdownTable } from 'markdown-table-ts';

interface WorkflowWithErrors {
  id: string;
  name: string;
  errors: string[];
}

interface MarkdownTableSchema {
  header: string;
  key: string;
  columns: any;
}

interface WorkflowToMarkdown {
  name: string;
  path: string;
  tables: MarkdownTableSchema[];
}

function getNestedKey<ObjectType>(object: ObjectType, path: string){
  const keys = path.split('.');
  let result = object;
  for (const key of keys) {
    result = result[key];
  }
  return result;
}
// type NestedKeyOf<ObjectType extends object> = {
//   [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
//     ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
//     : `${Key}`
// }[keyof ObjectType & (string | number)];
// declare function getNestedKey<T extends object>(object: T, path: NestedKeyOf<T>)

async function createMarkdownTables(settings: any,): Promise<WorkflowWithErrors[]> {
  const result: WorkflowWithErrors[] = []
  for (const folder of settings.folders) {
    const dir = await fs.readdir(folder, {
      withFileTypes: true,
    });

    for (const e of dir) {
      if (e.isFile() && [".yml", ".yaml"].includes(extname(e.name)) && !e.name.match(/^_/)) { // skip local / non-callable
        const workflowFilePath = join(folder, e.name);

        const workflowWithErrors = await createMarkdownTable({name: e.name, path: workflowFilePath, tables: settings.tables});
        if (workflowWithErrors.errors.length > 0) {
          result.push(workflowWithErrors)
        } else {
          console.log("Markdown generated for workflow:", e.name)
        }
      }
    }
  }

  return result;
}

async function createMarkdownTable(workflow: WorkflowToMarkdown): Promise<WorkflowWithErrors> {
  let workflowErrors: WorkflowWithErrors = {
    id: workflow.path,
    name: null,
    errors: []
  }
  try {
    const workflowFileContent = await fs.readFile(workflow.path, "utf8");
    const workflowObj = await yaml.load(workflowFileContent);
    const workflowName = workflow.name.replace(/\.ya?ml$/,'')
    const jobName = workflowObj.name || workflowName
    // const inputs = workflowObj.on.workflow_call.inputs
    // const outputs = workflowObj.on.workflow_call.outputs
    // const secrets = workflowObj.on.workflow_call.secrets

    // TODO: only call this once at the beginning
    await fs.mkdir('../../docs', { recursive: true }) // make sure docs dir exists

    let streamfs = require('fs');
    var mdStream = streamfs.createWriteStream(`../../docs/${workflowName}.md`, {flags: 'w'});
    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    mdStream.write(`# ${workflowName}\n`);

    let allInputs = []
    let requiredInputs = []
    for (const table of workflow.tables) {
      const rows = getNestedKey(workflowObj, table.key)

      if (rows) {
        mdStream.write(`## ${table.header}\n`);
        let tableBody = []
        Object.keys(rows).forEach( key => {

          let row = []
          for (const col of Object.keys(table.columns)) {

            switch (col) {
              case '_key':
                row.push(key) // insert column value for yaml object key
                break;

              case 'default':
                const inputDefault = rows[key].default || (typeof rows[key].default === 'string' ? "''" : "[undefined]")
                row.push(`\`${inputDefault}\``) // custom processing for empty or undefined 'default' values
                allInputs.push(`${key}: ${inputDefault}`)
                if(rows[key].required) {
                  requiredInputs.push(`${key}: ${inputDefault}`)
                }
                break;

              default:
                row.push(rows[key][col].toString()) // insert yaml property for matching column
                break;
            }
          }
          tableBody.push(row)
        })
        const mdTable = getMarkdownTable({
          table: {
            head: Object.values(table.columns),
            body: tableBody,
          },
          // alignment: [Align.Left, Align.Center, Align.Center, Align.Left, Align.Left],
        });

        mdStream.write(mdTable);
        mdStream.write('\n');
      }
    }

    mdStream.write('## Usage:\n');

    mdStream.write('### Minimal:\n');
    mdStream.write(`\`\`\`yaml
jobs:
  ${workflowName}:
    name: "${jobName}"
    uses: dawilk/workflows/.github/workflows/${workflow.name}@v1
    secrets: inherit${requiredInputs.length ? `\n    with:\n      ${requiredInputs.join('\n      ')}` : ''}\n\`\`\`\n`);

    mdStream.write('### Full (all defaults):\n');
    mdStream.write(`\`\`\`yaml
jobs:
  ${workflowName}:
    name: "${jobName}"
    uses: dawilk/workflows/.github/workflows/${workflow.name}@v1
    secrets: inherit
    with:
      ${allInputs.join('\n      ')}\n\`\`\`\n`);
    mdStream.end('');

    // workflowErrors.errors = res.errors.map(e => e.toString())
  } catch (e) {
    workflowErrors.errors.push(e.toString())
  }
  return workflowErrors;
}

(async function main() {
  try {
    const settings = require("./settings.json");
    const erroredWorkflows = await createMarkdownTables(
      settings
    )

    if (erroredWorkflows.length > 0) {
      startGroup(`😟 - Found ${erroredWorkflows.length} errors while making docs:`);
      erroredWorkflows.forEach(erroredWorkflow => {
        error(`Errors in ${erroredWorkflow.id} - ${erroredWorkflow.errors.map(e => e.toString()).join(", ")}`)
      })
      endGroup();
      setFailed(`Found ${erroredWorkflows.length} errors while making docs`);
    } else {
      info("🎉🤘 - No errors encountered while making docs!")
    }
  } catch (e) {
    error(`Unhandled error while making docs: ${e}`);
    setFailed(`Unhandled error`)
  }
})();
