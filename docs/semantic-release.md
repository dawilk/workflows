# semantic-release
## Inputs
| Input   | Type   | Required | Description                                                            | Default |
| ------- | ------ | -------- | ---------------------------------------------------------------------- | ------- |
| dry_run | string | false    | Only generate next version value; do not create a GitHub Release / Tag | `false` |
## Outputs
| Output  | Description                                    |
| ------- | ---------------------------------------------- |
| version | The version created by semantic-release action |
## Secrets
| Secret          | Required | Description                            |
| --------------- | -------- | -------------------------------------- |
| NODE_AUTH_TOKEN | false    | NPM Token used for publishing to npmjs |
## Usage:
### Minimal:
```yaml
jobs:
  semantic-release:
    name: "Semantic Release"
    uses: dawilk/workflows/.github/workflows/semantic-release.yml@v1
    secrets: inherit
```
### Full (all defaults):
```yaml
jobs:
  semantic-release:
    name: "Semantic Release"
    uses: dawilk/workflows/.github/workflows/semantic-release.yml@v1
    secrets: inherit
    with:
      dry_run: false
```
