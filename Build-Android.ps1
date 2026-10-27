param()
$ErrorActionPreference='Stop'
$projectRoot=$PSScriptRoot
$javaFolder=Get-ChildItem (Join-Path $projectRoot 'build-tools/java') -Directory | Where-Object {Test-Path (Join-Path $_.FullName 'bin/java.exe')} | Select-Object -First 1
if($javaFolder){$env:JAVA_HOME=$javaFolder.FullName}
$env:ANDROID_HOME=Join-Path $projectRoot 'build-tools/android-sdk'
$env:ANDROID_SDK_ROOT=$env:ANDROID_HOME
$env:PATH="$env:JAVA_HOME\bin;"+$env:PATH
$nodePath=Join-Path $projectRoot 'runtime/node.exe'
Push-Location $projectRoot
try {
 & $nodePath build-mobile.mjs
 if($LASTEXITCODE){throw 'Web asset build failed.'}
 & $nodePath build-native.mjs
 if($LASTEXITCODE){throw 'Native asset build failed.'}
 Push-Location native-app
 try { & $nodePath node_modules/@capacitor/cli/bin/capacitor sync android; if($LASTEXITCODE){throw 'Android sync failed.'} } finally {Pop-Location}
 $sdkLine='sdk.dir='+$env:ANDROID_HOME.Replace('\','/')
 [IO.File]::WriteAllText((Join-Path $projectRoot 'native-app/android/local.properties'),$sdkLine)
 Push-Location native-app/android
 try { & .\gradlew.bat assembleDebug --no-daemon; if($LASTEXITCODE){throw 'Android compilation failed.'} } finally {Pop-Location}
 New-Item -ItemType Directory -Force releases | Out-Null
 Copy-Item native-app/android/app/build/outputs/apk/debug/app-debug.apk releases/Yebo-Android.apk -Force
 & .\Verify-Android.ps1
 Get-FileHash releases/Yebo-Android.apk -Algorithm SHA256
} finally {Pop-Location}
