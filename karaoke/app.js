(()=>{
const C=window.KARAOKE_CONFIG||{}, S='karaoke.spotify.';
const $=id=>document.getElementById(id);
let lines=[],trackKey='',base=0,baseAt=Date.now(),dur=0,isPlaying=false,lastLine=-2;
const redirectUri=location.origin+location.pathname;
function playlistId(v){const m=(v||'').match(/(?:playlist[/:])([A-Za-z0-9]+)/);return m?m[1]:(/^[A-Za-z0-9]+$/.test(v||'')?v:'')}
const targetPlaylist=playlistId(C.playlist);
function b64(bytes){return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
async function sha(s){return new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))}
function rnd(n=64){const a=new Uint8Array(n);crypto.getRandomValues(a);return b64(a)}
function showError(t){$('error').textContent=t;$('error').style.display='block'}
async function authorize(){
 const verifier=rnd(64),state=rnd(18); localStorage.setItem(S+'verifier',verifier);localStorage.setItem(S+'state',state);
 const challenge=b64(await sha(verifier));
 const q=new URLSearchParams({client_id:C.spotifyClientId,response_type:'code',redirect_uri:redirectUri,
 scope:'user-read-playback-state user-read-currently-playing',code_challenge_method:'S256',code_challenge:challenge,state});
 location.replace('https://accounts.spotify.com/authorize?'+q);
}
async function exchange(code){
 const verifier=localStorage.getItem(S+'verifier');
 const r=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
 body:new URLSearchParams({client_id:C.spotifyClientId,grant_type:'authorization_code',code,redirect_uri:redirectUri,code_verifier:verifier})});
 if(!r.ok)throw new Error('Spotify-login kon niet worden afgerond.');
 const x=await r.json();saveTokens(x);history.replaceState({},'',location.pathname+location.hash);
}
function saveTokens(x){localStorage.setItem(S+'access',x.access_token);localStorage.setItem(S+'expires',Date.now()+x.expires_in*1000);if(x.refresh_token)localStorage.setItem(S+'refresh',x.refresh_token)}
async function access(){
 let a=localStorage.getItem(S+'access'),exp=+localStorage.getItem(S+'expires');
 if(a&&Date.now()<exp-60000)return a;
 const ref=localStorage.getItem(S+'refresh');if(!ref){await authorize();return null}
 const r=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
 body:new URLSearchParams({grant_type:'refresh_token',refresh_token:ref,client_id:C.spotifyClientId})});
 if(!r.ok){localStorage.removeItem(S+'access');localStorage.removeItem(S+'refresh');await authorize();return null}
 const x=await r.json();saveTokens(x);return x.access_token;
}
async function api(path){const a=await access();if(!a)return null;const r=await fetch('https://api.spotify.com/v1'+path,{headers:{Authorization:'Bearer '+a}});if(r.status===204)return null;if(r.status===401){localStorage.removeItem(S+'access');return api(path)}if(!r.ok)throw new Error('Spotify API '+r.status);return r.json()}
function norm(s){return (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function cleanTitle(s){return (s||'').replace(/\s*[-–—(]\s*(karaoke|instrumental|backing track|originally performed|in the style).*$/i,'').replace(/\b(karaoke version|instrumental version)\b/ig,'').trim()}
async function lyrics(title,artist,durationMs){
 const q=new URLSearchParams({track_name:cleanTitle(title),artist_name:artist});
 const r=await fetch('https://lrclib.net/api/search?'+q,{headers:{'Lrclib-Client':'StudentKaraokeDisplay/2.0'}});
 if(!r.ok)return [];const arr=await r.json();let best=null,score=-1;
 for(const x of arr){if(!x.syncedLyrics)continue;let s=0;if(norm(x.trackName)===norm(cleanTitle(title)))s+=100;
 const tw=norm(cleanTitle(title)).split(' ').filter(w=>w.length>2);s+=10*tw.filter(w=>norm(x.trackName).includes(w)).length;
 if(x.duration&&durationMs)s+=Math.max(0,25-Math.abs(x.duration-durationMs/1000));if(s>score){score=s;best=x}}
 if(!best)return [];return best.syncedLyrics.split('\n').map(l=>{const m=l.match(/^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/);return m?{ms:(+m[1]*60 + +m[2])*1000,text:m[3]}:null}).filter(Boolean)
}
function status(main,sub=''){lines=[];$('lyrics').innerHTML='<div><div class="status"></div><div class="sub"></div></div>';$('lyrics').querySelector('.status').textContent=main;$('lyrics').querySelector('.sub').textContent=sub}
function render(p){if(!lines.length)return;let i=-1;for(let k=0;k<lines.length;k++){if(lines[k].ms<=p)i=k;else break}if(i===lastLine)return;lastLine=i;
 $('lyrics').innerHTML='<div class="line prev"></div><div class="line current"></div><div class="line next"></div>';
 $('lyrics').children[0].textContent=i>0?lines[i-1].text:'';$('lyrics').children[1].textContent=i>=0?(lines[i].text||'♪'):'♪';$('lyrics').children[2].textContent=i+1<lines.length?lines[i+1].text:''
}
function fmt(ms){let s=Math.floor(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
async function poll(){
 try{
  const p=await api('/me/player');if(!p||!p.item){status('Start de karaokeplaylist in Spotify',C.playlistName||'');return}
  const contextId=p.context?.type==='playlist'?playlistId(p.context.uri):'';
  base=p.progress_ms||0;baseAt=Date.now();dur=p.item.duration_ms||0;isPlaying=!!p.is_playing;
  $('cover').src=p.item.album?.images?.[0]?.url||'';$('song').textContent=p.item.name||'';$('artist').textContent=(p.item.artists||[]).map(a=>a.name).join(', ');
  if(targetPlaylist && contextId!==targetPlaylist){trackKey='';status('Dit is niet de karaokeplaylist','Start “'+(C.playlistName||'Student Karaoke 2026 🎤')+'” in Spotify.');return}
  const key=p.item.id||p.item.uri;if(key!==trackKey){trackKey=key;lastLine=-2;status('Tekst zoeken…');const artist=(p.item.artists||[])[0]?.name||'';lines=await lyrics(p.item.name,artist,dur);
    if(!lines.length)status('Geen gesynchroniseerde tekst gevonden',p.item.name);else render(base)}
 }catch(e){console.error(e);showError(e.message)}
}
function tick(){const p=Math.min(dur,base+(isPlaying?Date.now()-baseAt:0));$('t1').textContent=fmt(p);$('t2').textContent=fmt(dur);$('fill').style.width=(dur?100*p/dur:0)+'%';render(p);requestAnimationFrame(tick)}
async function init(){
 if(!C.spotifyClientId||C.spotifyClientId.includes('PLAK_HIER')){showError('config.js: vul eerst je Spotify Client ID in.');return}
 if(!targetPlaylist){showError('config.js: vul eerst de Spotify playlist-URL of URI in.');return}
 const q=new URLSearchParams(location.search),code=q.get('code'),err=q.get('error');
 if(err){showError('Spotify toestemming geweigerd: '+err);return}
 if(code){if(q.get('state')!==localStorage.getItem(S+'state')){showError('Spotify login state mismatch.');return}await exchange(code)}
 await access();await poll();setInterval(poll,1500);requestAnimationFrame(tick)
}
init().catch(e=>showError(e.message));
})();