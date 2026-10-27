param([string]$ApkPath='releases/Yebo-Android.apk')
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$apk=[IO.Compression.ZipFile]::OpenRead((Join-Path $PSScriptRoot $ApkPath))
try {
 $entries=@{};foreach($entry in $apk.Entries){$entries[$entry.FullName]=$entry}
 foreach($required in @('AndroidManifest.xml','classes.dex','assets/public/index.html','assets/public/app.js','assets/public/pwa.js')){if(-not $entries.ContainsKey($required)){throw "APK is missing $required"}}
 $pack=Get-Content (Join-Path $PSScriptRoot 'native-app/www/offline-manifest.json') -Raw | ConvertFrom-Json
 $requiredFiles=@($pack.pictures)+@($pack.voices.en)+@($pack.voices.af)+@($pack.voices.zu)
 foreach($file in $requiredFiles){$entry=$entries['assets/public/'+$file];if(-not $entry -or $entry.Length -eq 0){throw "APK is missing offline asset $file"}}
 $reader=[IO.StreamReader]::new($entries['assets/public/pwa.js'].Open());try{$panel=$reader.ReadToEnd()}finally{$reader.Dispose()}
 if($panel -match 'serviceWorker.register|Install Yebo'){throw 'APK still contains browser installation logic'}
 $reader=[IO.StreamReader]::new($entries['assets/capacitor.config.json'].Open());try{$config=$reader.ReadToEnd() | ConvertFrom-Json}finally{$reader.Dispose()}
 if($config.server.url){throw 'APK points to a remote game server'}
 [PSCustomObject]@{Verified=$true;BundledFiles=$entries.Count;AppId=$config.appId;SizeMB=[math]::Round((Get-Item $ApkPath).Length/1MB,1)}
} finally {$apk.Dispose()}
