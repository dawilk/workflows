# npm-run-script
## Inputs
| Input                   | Type    | Required | Description                                                                                                                                                                | Default                     |
| ----------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| node-version            | string  | false    | Version Spec of the version to use. Examples: 12.x, 10.15.1, >=10.15.0.                                                                                                    | `[undefined]`               |
| node-version-file       | string  | false    | File containing the version Spec of the version to use.  Examples: .nvmrc, .node-version, .tool-versions.                                                                  | `[undefined]`               |
| registry-url            | string  | false    | Optional registry to set up for auth. Will set the registry in a project level .npmrc and .yarnrc file, and set up auth to read in from env.NODE_AUTH_TOKEN.               | `[undefined]`               |
| scope                   | string  | false    | Optional scope for authenticating against scoped registries. Will fall back to the repository owner when using the GitHub Packages registry (https://npm.pkg.github.com/). | `[undefined]`               |
| token                   | string  | false    | Used to pull node distributions from node-versions.  Since there's a default, this is typically not supplied by the user.                                                  | `${{ github.token }}`       |
| cache                   | string  | false    | Used to specify a package manager for caching in the default directory. Supported values: npm, yarn, pnpm.                                                                 | `npm`                       |
| cache-dependency-path   | string  | false    | Used to specify the path to a dependency file: package-lock.json, yarn.lock, etc. Supports wildcards or a list of file names for caching multiple dependencies.            | `./package-lock.json`       |
| private-registry-url    | string  | false    | Registry Url for private npm registry                                                                                                                                      | `[undefined]`               |
| private-registry-scope  | string  | false    | Registry Scope for private npm registry                                                                                                                                    | `[undefined]`               |
| private-registry-token  | string  | false    | Registry Token for private npm registry                                                                                                                                    | `[undefined]`               |
| cache-modules-path      | string  | false    | Used to specify the node_modules path to cache.                                                                                                                            | `./node_modules`            |
| NODE_OPTIONS            | string  | false    | Used to set NODE_OPTIONS env var before running npm commands                                                                                                               | `--max-old-space-size=6144` |
| working-directory       | string  | false    | Directory from which commands execute                                                                                                                                      | `.`                         |
| upload-artifact         | boolean | false    | Upload artifact to GitHub Actions                                                                                                                                          | `true`                      |
| artifact-zip            | boolean | false    | Zip artifact before uploading to GitHub Actions                                                                                                                            | `[undefined]`               |
| artifact-name           | string  | false    | Artifact name when uploaded to GitHub Actions                                                                                                                              | `build`                     |
| artifact-path           | string  | false    | Artifact path to upload. e.g. "dist" or "build"                                                                                                                            | `''`                        |
| artifact-retention-days | number  | false    | Artifact retention in days                                                                                                                                                 | `3`                         |
| node-script             | string  | true     | custom npm script name to run                                                                                                                                              | `''`                        |
## Outputs
| Output          | Description                                   |
| --------------- | --------------------------------------------- |
| artifact-name   | Artifact name uploaded to GitHub Actions      |
| artifact-zipped | Whether the artifact was zipped when uploaded |
## Usage:
### Minimal:
```yaml
jobs:
  npm-run-script:
    name: "NPM Script"
    uses: dawilk/workflows/.github/workflows/npm-run-script.yml@v1
    secrets: inherit
    with:
      node-script: ''
```
### Full (all defaults):
```yaml
jobs:
  npm-run-script:
    name: "NPM Script"
    uses: dawilk/workflows/.github/workflows/npm-run-script.yml@v1
    secrets: inherit
    with:
      node-version: [undefined]
      node-version-file: [undefined]
      registry-url: [undefined]
      scope: [undefined]
      token: ${{ github.token }}
      cache: npm
      cache-dependency-path: ./package-lock.json
      private-registry-url: [undefined]
      private-registry-scope: [undefined]
      private-registry-token: [undefined]
      cache-modules-path: ./node_modules
      NODE_OPTIONS: --max-old-space-size=6144
      working-directory: .
      upload-artifact: true
      artifact-zip: [undefined]
      artifact-name: build
      artifact-path: ''
      artifact-retention-days: 3
      node-script: ''
```
