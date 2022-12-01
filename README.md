# workflows
Reusable workflows for GitHub Actions

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

|Category|Workflow|Description|
|:--|:--|:--|
|NPM|[Pack](docs/npm-pack.md)| Version and package an NPM module for distribution |
|NPM|[Publish](docs/npm-publish.md)| [Version and] Publish an NPM module to a registry |
|NPM|[Script](docs/npm-run-script.md)| Run an NPM script and \[optionally\] upload output artifact (build, test results, etc.) to GitHub Actions for consumption by other jobs |
|Release CI|[Semantic-Release](docs/semantic-release.md)| Automatically generate a Release in GitHub (requires the use of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)) |

## Contributing

### Workflow Standards
* Only accepting workflows for common CI tasks involving common languages or platforms
* Workflow filename requirements:
    * all lower case
    * hyphen-separated words
    * descriptive, but limit to 2-4 words

    Examples of acceptable patterns:
    * `[verb]-[thing].yml`
    * `[cli/app]-[verb][-thing].yml`
* All `inputs`, `outputs`, and `secrets` must have clear, accompanying descriptions
* If possible, workflows should have an accompanying `_test-[workflow-name].yml` workflow and any required files in `tests/[workflow-name]/` directory to validate functionality.

### How to add new workflows or make changes

1. Fork the repository
1. Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) when making changes
1. Validate workflow schemas with `cd script/validate-workflows && npm ci && npm run validate`
1. Open a PR
