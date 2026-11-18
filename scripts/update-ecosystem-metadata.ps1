# Explicit owner-side metadata helper. DRY RUN unless -Apply is supplied.
# Never changes visibility, branches, workflows, deployments or repository contents.
[CmdletBinding()]
param([switch]$Apply)
$ErrorActionPreference = 'Stop'
$repos = @(
  @{
    Repo = 'AdityaSreevatsaK/Taiyous-Shared-Core'
    Description = "Shared contracts, UI components and Personal Hub for Taiyou's novels, manga, anime, movies and TV libraries."
    Homepage = ''
    Topics = @('personal-hub','shared-ui','typescript','react','monorepo','media-library','design-system')
  },
  @{
    Repo = 'AdityaSreevatsaK/Taiyous-Personal-Library'
    Description = 'Personal EPUB novel library and offline-first reader with private Hugging Face storage, Cloudflare Pages, collections and ratings.'
    Homepage = 'https://taiyous-personal-library.pages.dev'
    Topics = @('epub','novel-reader','pwa','react','typescript','cloudflare-pages','offline-first','personal-library')
  },
  @{
    Repo = 'AdityaSreevatsaK/Taiyous-Manga-Library'
    Description = 'Private manga catalogue and future image chapter reader with page progress, collections and offline reading.'
    Homepage = ''
    Topics = @('manga','personal-library','react','typescript','reader','cloudflare-pages')
  },
  @{
    Repo = 'AdityaSreevatsaK/Taiyous-Anime-Library'
    Description = 'Private anime catalogue, watchlists, season/episode tracking and personal ratings.'
    Homepage = ''
    Topics = @('anime','watchlist','typescript','react','personal-library','episode-tracker')
  },
  @{
    Repo = 'AdityaSreevatsaK/Taiyous-Movies-TV-Library'
    Description = 'Private movies and TV series tracker with watchlists, seasons, episodes and ratings.'
    Homepage = ''
    Topics = @('movies','tv-series','watchlist','react','typescript','personal-library')
  }
)
if ($Apply -and -not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI (gh) is required. Install it and run gh auth login before using -Apply.'
}
foreach ($item in $repos) {
  Write-Host ''
  Write-Host "Repository: $($item.Repo)"
  Write-Host "  Description: $($item.Description)"
  Write-Host "  Topics: $($item.Topics -join ', ')"
  Write-Host "  Homepage: $(if ($item.Homepage) { $item.Homepage } else { '<unchanged>' })"
  if (-not $Apply) { continue }
  & gh repo edit $item.Repo --description $item.Description
  if ($LASTEXITCODE -ne 0) { throw "Failed to set description for $($item.Repo)" }
  if ($item.Homepage) {
    & gh repo edit $item.Repo --homepage $item.Homepage
    if ($LASTEXITCODE -ne 0) { throw "Failed to set homepage for $($item.Repo)" }
  }
  $body = @{ names = $item.Topics } | ConvertTo-Json -Compress
  $body | & gh api --method PUT "repos/$($item.Repo)/topics" -H 'Accept: application/vnd.github+json' --input -
  if ($LASTEXITCODE -ne 0) { throw "Failed to set topics for $($item.Repo)" }
  Write-Host '  Metadata updated.' -ForegroundColor Green
}
if (-not $Apply) {
  Write-Host ''
  Write-Host 'Dry run only. Re-run with -Apply to update GitHub About metadata.'
}
