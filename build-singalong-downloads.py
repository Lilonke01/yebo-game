from pathlib import Path
import subprocess,urllib.request
import imageio_ffmpeg
root=Path.cwd();audio=root/'audio';ff=imageio_ffmpeg.get_ffmpeg_exe()
source=audio/'handclap-OwlStorm.mp3'
urllib.request.urlretrieve('https://cdn.freesound.org/previews/151/151219_140737-hq.mp3',source)
subprocess.run([ff,'-v','error','-y','-i',str(source),'-af','silenceremove=start_periods=1:start_duration=0.002:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,areverse,alimiter=limit=0.85','-ar','44100','-ac','1',str(audio/'sing-clap.wav')],check=True)
def decode(file):return subprocess.run([ff,'-v','error','-i',str(audio/file),'-f','s16le','-ar','44100','-ac','1','pipe:1'],capture_output=True,check=True).stdout
clap=decode('sing-clap.wav');combined=b'';out=root/'sing-along-downloads'
for lang,name,count,start in [('en','Give-them-a-hand-English',4,0),('zu','Give-them-a-hand-isiZulu',4,0),('af','Give-them-a-hand-Afrikaans',4,0),('en','Yebo-Magic',3,4)]:
 pcm=b''
 for i in range(count):
  pcm+=decode(f'sing-{lang}-{i+start}.mp3')+b'\0'*int(44100*.18)*2
  if (start==4 and i==0) or (start==0 and i<3):pcm+=clap+b'\0'*int(44100*.38)*2
 subprocess.run([ff,'-v','error','-y','-f','s16le','-ar','44100','-ac','1','-i','pipe:0','-codec:a','libmp3lame','-b:a','128k',str(out/(name+'.mp3'))],input=pcm,check=True)
 combined+=pcm+b'\0'*44100*2
for name in ['All-sing-alongs.mp3','All-sing-alongs-real-handclaps.mp3']:
 subprocess.run([ff,'-v','error','-y','-f','s16le','-ar','44100','-ac','1','-i','pipe:0','-codec:a','libmp3lame','-b:a','128k',str(out/name)],input=combined,check=True)
print('Updated game clap and all five downloads using recorded human handclap.')
