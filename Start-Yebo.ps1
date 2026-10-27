param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$gameFolder = $PSScriptRoot
$gameUrl = 'http://127.0.0.1:4173'
$running = $false
try { $response = Invoke-WebRequest -Uri $gameUrl -TimeoutSec 2; $running = $response.Content -match 'Yebo' } catch {}
if (-not $running) {
    $localNode = Join-Path $gameFolder 'runtime\node.exe'
    $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
    $nodePath = if (Test-Path -LiteralPath $localNode) { $localNode } elseif ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
    if (-not (Test-Path -LiteralPath $nodePath)) { throw 'Node.js was not found. Install Node.js or run this game from Codex.' }
    Start-Process -FilePath $nodePath -ArgumentList ('"' + (Join-Path $gameFolder 'server.mjs') + '"') -WorkingDirectory $gameFolder -WindowStyle Hidden
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        Start-Sleep -Milliseconds 200
        try { $response = Invoke-WebRequest -Uri $gameUrl -TimeoutSec 1; if ($response.Content -match 'Yebo') { $running = $true; break } } catch {}
    }
}
if (-not $running) { throw 'The game could not start on port 4173. Check whether another app is using that port.' }
if (-not $NoBrowser) { Start-Process $gameUrl }
