const https = require('https');
const fs = require('fs');

https.get('https://www.instagram.com/p/C4-bt1py9fh/embed/captioned/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    // Find video url
    const idx = body.indexOf('.mp4');
    if (idx !== -1) {
      const start = body.lastIndexOf('https', idx);
      let url = body.substring(start, idx + 4);
      // Look for query params
      const quote = body.indexOf('"', idx);
      const slashQuote = body.indexOf('\\"', idx);
      const end = (slashQuote !== -1 && slashQuote < quote) ? slashQuote : quote;
      if (end !== -1 && end - idx < 500) {
        url = body.substring(start, end);
      }
      url = url.split('\\/').join('/').split('\\\\/').join('/');
      url = url.replace(/\\u0026/g, '&').replace(/\\\\u0026/g, '&');
      url = url.replace(/\\u00253D/g, '=').replace(/\\\\u00253D/g, '=');
      url = url.replace(/\\u0025/g, '%').replace(/\\\\u0025/g, '%');
      console.log('Target video URL found:', url.slice(0, 120));
      
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, dlRes => {
        console.log('DL status:', dlRes.statusCode, dlRes.headers['content-type'], dlRes.headers['content-length']);
        if (dlRes.statusCode === 200) {
          const stream = fs.createWriteStream('public/reels/C4-bt1py9fh.mp4');
          dlRes.pipe(stream);
          stream.on('finish', () => {
            stream.close();
            console.log('FINISHED DOWNLOADING C4-bt1py9fh.mp4 size:', fs.statSync('public/reels/C4-bt1py9fh.mp4').size);
          });
        }
      });
    } else {
      console.log('No .mp4 in body');
    }
  });
});
