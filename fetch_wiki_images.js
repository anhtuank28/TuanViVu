const https = require('https');

function searchWikiImages(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 TourManager/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.query || !json.query.pages) return resolve([]);
          const pages = Object.values(json.query.pages);
          const urls = pages.map(p => p.imageinfo && p.imageinfo[0].url).filter(Boolean);
          // Filter out svg, pdf, webm, ogv, maps, flags
          const validUrls = urls.filter(u => {
            const low = u.toLowerCase();
            return (low.endsWith('.jpg') || low.endsWith('.jpeg') || low.endsWith('.png')) &&
                   !low.includes('map') && !low.includes('flag') && !low.includes('logo');
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
  const regions = ["Sapa Vietnam", "Ha Long Bay", "Da Nang", "Phu Quoc", "Ha Giang", "Trang An Ninh Binh", "Nha Trang", "Hue Vietnam", "Mekong Delta", "Japan landscape", "Europe landscape", "Seoul landscape", "Thailand landscape", "Bali landscape", "USA landscape", "Australia landscape", "Singapore landscape", "Taiwan landscape", "London landscape"];
  const results = {};
  for (let r of regions) {
    const imgs = await searchWikiImages(r);
    results[r] = imgs;
    console.log(`Region ${r}: found ${imgs.length} images`);
  }
  const fs = require('fs');
  fs.writeFileSync('wiki_images.json', JSON.stringify(results, null, 2));
}

run();
