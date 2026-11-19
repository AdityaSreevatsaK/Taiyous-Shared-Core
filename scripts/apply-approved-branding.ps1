<#
.SYNOPSIS
Applies the exact owner-approved Taiyou Sun assets to the existing branding PR.
.DESCRIPTION
Requires a clean checkout of feat/hub-approved-sun-branding, Git and PowerShell.
Accepts either the original Taiyou_Final_Logos_Ready_For_Webapp.zip or the
prepared Taiyou_Shared_Hub_Approved_Branding_Assets.zip.
Only the four required assets are extracted. SHA-256 is checked before committing.
.EXAMPLE
pwsh -File scripts/apply-approved-branding.ps1 -Archive "C:\\Downloads\\Taiyou_Shared_Hub_Approved_Branding_Assets.zip"
#>
param(
  [Parameter(Mandatory = $true)]
  [string]$Archive
)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$branch = 'feat/hub-approved-sun-branding'
$actualBranch = (& git -C $root branch --show-current).Trim()
if ($LASTEXITCODE -ne 0 -or $actualBranch -ne $branch) {
  throw "Check out $branch before applying the logo pack. Current branch: $actualBranch"
}
$dirty = @(& git -C $root status --porcelain)
if ($LASTEXITCODE -ne 0 -or $dirty.Count -gt 0) {
  throw 'A clean working tree is required. Commit or stash existing changes first.'
}
$zipPath = (Resolve-Path -LiteralPath $Archive).Path
Add-Type -AssemblyName System.IO.Compression
$assets = [ordered]@{
  'branding/logos/logo-dark.png' = '7876d5730d0622033d299f00b8ecd3c5d394f23c7d67c27538f247580bc7a2f6'
  'branding/logos/logo-light.png' = 'a8949f311d18f6f13567889ba0d3e3f8f398b75177fe306f08e7ceb9bcdd825b'
  'branding/favicons/favicon-dark.ico' = '094c20ba7b69b9348d0afde23fd7c6e2838ea9f76fb6b84970d84d2532b1ffd4'
  'branding/favicons/favicon-light.ico' = '4138240f036def106e9551ecf7301c399bc8318bc59301ffe990b3a42472c56b'
}
# Verify all bytes before writing anything to the checkout.
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  $selected = @{}
  foreach ($relative in $assets.Keys) {
    $preparedPath = "apps/hub/public/$relative"
    $entry = $zip.GetEntry($preparedPath)
    if ($null -eq $entry) { $entry = $zip.GetEntry($relative) }
    if ($null -eq $entry) {
      throw "Required archive entry missing: $relative"
    }
    $memory = [System.IO.MemoryStream]::new()
    try {
      $entryStream = $entry.Open()
      try { $entryStream.CopyTo($memory) } finally { $entryStream.Dispose() }
      $data = $memory.ToArray()
    } finally {
      $memory.Dispose()
    }
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
      $actual = [BitConverter]::ToString($sha.ComputeHash($data)).Replace('-', '').ToLowerInvariant()
    } finally {
      $sha.Dispose()
    }
    if ($actual -ne $assets[$relative]) {
      throw "Approved SHA-256 mismatch for $relative; no files changed."
    }
    $selected[$relative] = $data
  }
  foreach ($relative in $assets.Keys) {
    $target = Join-Path $root "apps/hub/public/$relative"
    $parent = Split-Path -Parent $target
    [System.IO.Directory]::CreateDirectory($parent) | Out-Null
    [System.IO.File]::WriteAllBytes($target, $selected[$relative])
    & git -C $root add -- "apps/hub/public/$relative"
    if ($LASTEXITCODE -ne 0) { throw "Git add failed for $relative" }
  }
} finally {
  $zip.Dispose()
}
& git -C $root diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged changes failed Git whitespace validation.' }
& git -C $root commit -m "assets(hub): add exact approved Taiyou Sun branding"
if ($LASTEXITCODE -ne 0) { throw 'Git commit failed. Assets remain staged locally.' }
& git -C $root push origin $branch
if ($LASTEXITCODE -ne 0) { throw 'Git push failed. Commit remains available locally for retry.' }
Write-Host 'Approved branding pushed. Review the GitHub Actions checks on PR #12.'
