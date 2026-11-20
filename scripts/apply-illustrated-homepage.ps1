# Import the four user-approved cropped card illustrations, then commit and push them.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/apply-illustrated-homepage.ps1 -Archive "C:\Downloads\Taiyou_Hub_Illustrated_Cards_Assets.zip"
param([Parameter(Mandatory = $true)][string]$Archive)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$targetBranch = 'feat/hub-illustrated-homepage'
if (-not (Test-Path -LiteralPath $Archive -PathType Leaf)) { throw "ZIP not found: $Archive" }
$branch = (& git -C $repo branch --show-current).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -ne $targetBranch) {
  throw "Switch to branch $targetBranch in the Shared Core repository first. Current: $branch"
}
$dirty = & git -C $repo status --porcelain
if ($LASTEXITCODE -ne 0 -or $dirty) { throw "Working tree must be clean to avoid unrelated changes." }
$expected = [ordered]@{
  'novels.avif' = '10ec9db58439c6b43a829f50cbbef7184730a21b59b987bacf9b772a8c67613e'
  'manga.avif' = '5ac1c476c530e9e7f08967e1a0ff9db5a29191f74e5e30e3c16a9f00ecbd5c4f'
  'anime.avif' = '19ffe64f326fffbb3ca6569d2bfb0dc29045b5ea8147d40b765a7c204d2ba6b8'
  'movies-tv.avif' = '9998599afe35b60d839efca75c239f52fd109988a9a747617deb406d2e2bd1e1'
}
$tmp = Join-Path ([IO.Path]::GetTempPath()) ('taiyou-hub-art-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
  Expand-Archive -LiteralPath $Archive -DestinationPath $tmp -Force
  foreach ($file in $expected.Keys) {
    $source = Join-Path $tmp ('apps/hub/public/art/' + $file)
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing asset in ZIP: $file" }
    $actual = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actual -ne $expected[$file]) { throw "Unexpected SHA-256 hash for $file" }
  }
  $destination = Join-Path $repo 'apps/hub/public/art'
  New-Item -ItemType Directory -Path $destination -Force | Out-Null
  foreach ($file in $expected.Keys) {
    Copy-Item -LiteralPath (Join-Path $tmp ('apps/hub/public/art/' + $file)) -Destination (Join-Path $destination $file) -Force
  }
  & git -C $repo add -- 'apps/hub/public/art/novels.avif' 'apps/hub/public/art/manga.avif' 'apps/hub/public/art/anime.avif' 'apps/hub/public/art/movies-tv.avif'
  if ($LASTEXITCODE -ne 0) { throw "Git staging failed" }
  & git -C $repo commit -m "feat(hub): add approved illustrated card artwork"
  if ($LASTEXITCODE -ne 0) { throw "Git commit failed" }
  & git -C $repo push origin $targetBranch
  if ($LASTEXITCODE -ne 0) { throw "Git push failed" }
  Write-Host "Artwork pushed. Review the PR CI before merging."
} finally {
  Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
}
