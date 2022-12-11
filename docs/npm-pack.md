# npm-pack
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
| package-version         | string  | true     | Package version (required, and should be automated using Release or semantic-release)                                                                                      | `''`                        |
| package-prerelease      | boolean | false    | Package prerelease packages                                                                                                                                                | `[undefined]`               |
| package-prerelease-tag  | string  | false    | Tag used for prerelease packages                                                                                                                                           | `alpha`                     |
| upload-artifact         | boolean | false    | Upload artifact to GitHub Actions                                                                                                                                          | `true`                      |
| artifact-retention-days | number  | false    | Artifact retention in days                                                                                                                                                 | `3`                         |
## Outputs
| Output           | Description                                         |
| ---------------- | --------------------------------------------------- |
| package-filename | Package filename uploaded to the artifact container |
| package-tag      | Tag for prerelease packages                         |
| package-version  | Artifact version for npm                            |
## Usage:
### Minimal:
```yaml
jobs:
  npm-pack:
    name: "NPM Pack"
    uses: dawilk/workflows/.github/workflows/npm-pack.yml@v1
    secrets: inherit
    with:
      package-version: ''
```
### Full (all defaults):
```yaml
jobs:
  npm-pack:
    name: "NPM Pack"
    uses: dawilk/workflows/.github/workflows/npm-pack.yml@v1
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
      package-version: ''
      package-prerelease: [undefined]
      package-prerelease-tag: alpha
      upload-artifact: true
      artifact-retention-days: 3
```
