$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$yeboVoice = [System.Speech.Synthesis.SpeechSynthesizer]::new()
try {
    $yeboVoice.SelectVoice('Microsoft Hazel Desktop')
    $yeboVoice.Rate = 0
    $format = [System.Speech.AudioFormat.SpeechAudioFormatInfo]::new(16000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
    $scripts = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'voice-scripts.json') -Raw | ConvertFrom-Json
    foreach ($clip in $scripts) {
        $outputPath = Join-Path (Join-Path $PSScriptRoot 'audio') $clip.file
        if (Test-Path -LiteralPath $outputPath) { continue }
        $yeboVoice.SetOutputToWaveFile($outputPath, $format)
        $safeText = [System.Security.SecurityElement]::Escape($clip.text)
        $ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-GB"><prosody pitch="+12%" rate="-5%">' + $safeText + '</prosody></speak>'
        $yeboVoice.SpeakSsml($ssml)
        $yeboVoice.SetOutputToNull()
    }
    Write-Output "Narration ready: $($scripts.Count) clips."
} finally { $yeboVoice.Dispose() }
