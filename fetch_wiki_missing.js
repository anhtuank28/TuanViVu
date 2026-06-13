const https = require('https');

function searchWikiImages(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 TourManager/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.query || !json.query.pages) return resolve([]);
          const pages = Object.values(json.query.pages);
          const urls = pages.map(p => p.imageinfo && p.imageinfo[0].url).filter(Boolean);
          const validUrls = urls.filter(u => {
            const low = u.toLowerCase();
            return (low.endsWith('.jpg') || low.endsWith('.jpeg') || low.endsWith('.png')) &&
                   !low.includes('map') && !low.includes('flag') && !low.includes('logo') && !low.includes('text');
          });
          resolve(validUrls.slice(0, 4));
        } catch(e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const fs = require('fs');
  const results = JSON.parse(fs.readFileSync('wiki_images.json', 'utf8'));
  const fallbackQueries = {
    "Japan landscape": "Japan mount fuji",
    "Europe landscape": "Europe travel landscape",
    "Seoul landscape": "Seoul city",
    "Thailand landscape": "Bangkok temple",
    "Bali landscape": "Bali temple",
    "USA landscape": "Grand Canyon",
    "Australia landscape": "Sydney Opera House",
  };
  
  for (let r in fallbackQueries) {
    if (!results[r] || results[r].length === 0) {
      const imgs = await searchWikiImages(fallbackQueries[r]);
      results[r] = imgs;
      console.log(`Region ${r}: found ${imgs.length} images via fallback`);
    }
  }
  fs.writeFileSync('wiki_images.json', JSON.stringify(results, null, 2));
}

run();
