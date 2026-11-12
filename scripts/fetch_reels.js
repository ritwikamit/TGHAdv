const fs = require('fs');
const https = require('https');

function cleanUrl(raw) {
  return raw
    .split('\\/').join('/')
    .split('\\u0026').join('&')
    .split('\\').join('');
}

function getUrl(file) {
  const html = fs.readFileSync(file, 'utf8');
  const idx = html.indexOf('.mp4');
  if (idx === -1) return null;
  const start = html.lastIndexOf('https:', idx);
  let end = html.indexOf('"', idx);
  return cleanUrl(html.slice(start, end));
}

function getPoster(file) {
  const html = fs.readFileSync(file, 'utf8');
  let idx = html.indexOf('_cover_frame');
  if (idx === -1) idx = html.indexOf('.jpg');
  if (idx === -1) return null;
  const start = html.lastIndexOf('https:', idx);
  let end = html.indexOf('"', idx);
  return cleanUrl(html.slice(start, end));
}

function download(url, dest) {
  return new Promise((resolve) => {
    if (!url) return resolve();
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Saved', dest, fs.statSync(dest).size, 'bytes');
        resolve();
      });
    }).on('error', (err) => {
      console.error('Error downloading', dest, err);
      resolve();
    });
  });
}

async function main() {
  const u1 = getUrl('/tmp/reel1.html');
  const p1 = getPoster('/tmp/reel1.html');
  console.log('Reel 1:', u1 ? u1.slice(0, 80) : 'none');

  const u2 = getUrl('/tmp/reel2.html');
  const p2 = getPoster('/tmp/reel2.html');
  console.log('Reel 2:', u2 ? u2.slice(0, 80) : 'none');

  await download(u1, 'public/reels/DCYrmYgyjns.mp4');
  await download(p1, 'public/reels/DCYrmYgyjns.jpg');
  await download(u2, 'public/reels/C_h6bbOyC9j.mp4');
  await download(p2, 'public/reels/C_h6bbOyC9j.jpg');
  console.log('Done downloading requested reels!');
}

main();
