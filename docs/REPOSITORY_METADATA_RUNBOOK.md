# Five-Repository GitHub Metadata Runbook

The connected GitHub app can edit code and pull requests but does not expose the administrative API required to set repository descriptions/topics/websites directly. The **exact metadata choices** are documented in each repository's `docs/REPOSITORY_SETTINGS.md`.

## Recommended one-command owner workflow (Windows)
1. Install GitHub CLI (`gh`) if unavailable, then run `gh auth login` using your owner account. For private repositories, ensure the CLI token has appropriate `repo` scope and access.
2. Clone **Taiyous-Shared-Core** after the scaffolding PR has merged.
3. Open PowerShell at the repository root.
4. Preview changes with no writes:

   ~~~powershell
   .\scripts\update-ecosystem-metadata.ps1
   ~~~

5. Inspect all five descriptions, topics and homepage values. Apply only after review:

   ~~~powershell
   .\scripts\update-ecosystem-metadata.ps1 -Apply
   ~~~

6. Verify in each repository's GitHub **About** section and Settings → General. This is metadata only and does not publish data or modify visibility.

## Safety
- Script does not change GitHub repository visibility, branch protection, default branch, Secrets, releases or deployments.
- It does not clear existing homepage URLs for new apps; it only sets the known verified Novel Library homepage.
- GitHub descriptions/topics are public metadata even when repository contents are private; they contain no credentials or user data.
- If your GitHub CLI lacks permission, stop and use the GitHub About gear manually. Never paste tokens into repository files or an agent prompt.
- The existing Novel Library source repository is currently PUBLIC. Four new repositories are PRIVATE. Visibility is a separate user decision and is not modified here.

## Manual alternative
Open each repo → About gear → Description, Website, Topics and paste the exact values in `docs/REPOSITORY_SETTINGS.md`. Verify the page after saving.

## Post-change record
Record the date, authenticated account and successful repository metadata values in your own private working notes. Do not commit authentication tokens or secret output.
