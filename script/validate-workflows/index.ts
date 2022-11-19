#!/usr/bin/env npx ts-node
import { promises as fs } from "fs";
import * as yaml from "js-yaml";
import { extname, join } from "path";
import { Validator as validator } from "jsonschema";
import { endGroup, error, info, setFailed, startGroup } from '@actions/core';

interface WorkflowWithErrors {
  id: string;
  name: string;
  errors: string[];
}

async function checkWorkflows(folders: string[], allowed_categories: object[]): Promise<WorkflowWithErrors[]> {
  const result: WorkflowWithErrors[] = []
  const workflow_template_names = new Set()
  for (const folder of folders) {
    const dir = await fs.readdir(folder, {
      withFileTypes: true,
    });

    for (const e of dir) {
      if (e.isFile() && [".yml", ".yaml"].includes(extname(e.name))) {
        const workflowFilePath = join(folder, e.name);

        const workflowWithErrors = await checkWorkflow(workflowFilePath, allowed_categories);
        if (workflowWithErrors.errors.length > 0) {
          result.push(workflowWithErrors)
        } else {
          console.log("Valid:", e.name)
        }
      }
    }
  }

  return result;
}

async function checkWorkflow(workflowPath: string, allowed_categories: object[]): Promise<WorkflowWithErrors> {
  let workflowErrors: WorkflowWithErrors = {
    id: workflowPath,
    name: null,
    errors: []
  }
  try {
    const workflowFileContent = await fs.readFile(workflowPath, "utf8");
    const workflowObj = await yaml.load(workflowFileContent);

    const workflowSchemaFileContent = await fs.readFile('./github-workflow.json', "utf8");
    const workflowSchema = await JSON.parse(workflowSchemaFileContent)

    let v = new validator();
    const res = v.validate(workflowObj, workflowSchema)

    workflowErrors.errors = res.errors.map(e => e.toString())
  } catch (e) {
    workflowErrors.errors.push(e.toString())
  }
  return workflowErrors;
}

(async function main() {
  try {
    const settings = require("./settings.json");
    const erroredWorkflows = await checkWorkflows(
      settings.folders, settings.allowed_categories
    )

    if (erroredWorkflows.length > 0) {
      startGroup(`😟 - Found ${erroredWorkflows.length} workflows with errors:`);
      erroredWorkflows.forEach(erroredWorkflow => {
        error(`Errors in ${erroredWorkflow.id} - ${erroredWorkflow.errors.map(e => e.toString()).join(", ")}`)
      })
      endGroup();
      setFailed(`Found ${erroredWorkflows.length} workflows with errors`);
    } else {
      info("🎉🤘 - Found no workflows with errors!")
    }
  } catch (e) {
    error(`Unhandled error while syncing workflows: ${e}`);
    setFailed(`Unhandled error`)
  }
})();
