# Import the four user-approved cropped card illustrations, then commit and push them.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/apply-illustrated-homepage.ps1 -Archive "C:\Downloads\Taiyou_Hub_Full_Tiles_Ready.zip"
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
  'novels.avif' = 'fffe541816cb11d83f2f5c7f68bc54bc5013b91870a5b6c2b75f769ab6c157e7'
  'manga.avif' = 'fa5880aa684abbca6bba733c7dce1cb7102653aee14e7309622c93bc7a1a7109'
  'anime.avif' = 'ebdb631f4d4ca024d0f451dd5f5a3d2ed3d8d73f7c66893c27523c170bad64c8'
  'movies-tv.avif' = '57c526634ed15ba5bf6484dffeeee2496c51b38d8132205da500117a04ea8649'
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
