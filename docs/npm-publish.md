# npm-publish
## Inputs
| Input                  | Type    | Required | Description                                                                                                                                                                | Default                     |
| ---------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| node-version           | string  | false    | Version Spec of the version to use. Examples: 12.x, 10.15.1, >=10.15.0.                                                                                                    | `[undefined]`               |
| node-version-file      | string  | false    | File containing the version Spec of the version to use.  Examples: .nvmrc, .node-version, .tool-versions.                                                                  | `[undefined]`               |
| registry-url           | string  | false    | Optional registry to set up for auth. Will set the registry in a project level .npmrc and .yarnrc file, and set up auth to read in from env.NODE_AUTH_TOKEN.               | `[undefined]`               |
| scope                  | string  | false    | Optional scope for authenticating against scoped registries. Will fall back to the repository owner when using the GitHub Packages registry (https://npm.pkg.github.com/). | `[undefined]`               |
| token                  | string  | false    | Used to pull node distributions from node-versions.  Since there's a default, this is typically not supplied by the user.                                                  | `${{ github.token }}`       |
| cache                  | string  | false    | Used to specify a package manager for caching in the default directory. Supported values: npm, yarn, pnpm.                                                                 | `npm`                       |
| cache-dependency-path  | string  | false    | Used to specify the path to a dependency file: package-lock.json, yarn.lock, etc. Supports wildcards or a list of file names for caching multiple dependencies.            | `./package-lock.json`       |
| private-registry-url   | string  | false    | Registry Url for private npm registry                                                                                                                                      | `[undefined]`               |
| private-registry-scope | string  | false    | Registry Scope for private npm registry                                                                                                                                    | `[undefined]`               |
| private-registry-token | string  | false    | Registry Token for private npm registry                                                                                                                                    | `[undefined]`               |
| cache-modules-path     | string  | false    | Used to specify the node_modules path to cache.                                                                                                                            | `./node_modules`            |
| NODE_OPTIONS           | string  | false    | Used to set NODE_OPTIONS env var before running npm commands                                                                                                               | `--max-old-space-size=6144` |
| working-directory      | string  | false    | Directory from which commands execute                                                                                                                                      | `.`                         |
| download-artifact      | boolean | false    | Download package artifact from GitHub Actions                                                                                                                              | `[undefined]`               |
| artifact-name          | string  | false    | Artifact name to download from GitHub Actions (required if download-artifact: true)                                                                                        | `''`                        |
| publish-version        | string  | false    | Publish package version (required if not using an artifact)                                                                                                                | `''`                        |
| publish-prerelease     | boolean | false    | Publish prerelease packages                                                                                                                                                | `[undefined]`               |
| publish-prerelease-tag | string  | false    | Tag for prerelease packages                                                                                                                                                | `alpha`                     |
| publish-access         | string  | false    | Publish public or restricted (private). Options: public, restricted                                                                                                        | `public`                    |
| publish-dryrun         | boolean | false    | Do a publish dry-run                                                                                                                                                       | `[undefined]`               |
## Secrets
| Secret          | Required | Description                    |
| --------------- | -------- | ------------------------------ |
| NODE_AUTH_TOKEN | false    | NPM Token used for publishing. |
## Usage:
### Minimal:
```yaml
jobs:
  npm-publish:
    name: "NPM Publish"
    uses: dawilk/workflows/.github/workflows/npm-publish.yml@v1
    secrets: inherit
```
### Full (all defaults):
```yaml
jobs:
  npm-publish:
    name: "NPM Publish"
    uses: dawilk/workflows/.github/workflows/npm-publish.yml@v1
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
      download-artifact: [undefined]
      artifact-name: ''
      publish-version: ''
      publish-prerelease: [undefined]
      publish-prerelease-tag: alpha
      publish-access: public
      publish-dryrun: [undefined]
```
