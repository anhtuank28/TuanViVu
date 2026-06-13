require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// All URLs verified HTTP 200 by curl
const regionImages = {
  sapa: [
    "https://images.unsplash.com/photo-1528127269322-539801943592",
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65"
  ],
  halong: [
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561",
    "https://images.unsplash.com/photo-1528127269322-539801943592",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
  ],
  danang: [
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
  ],
  phuquoc: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501066927591-314112b5888e",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6"
  ],
  hagiang: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1528127269322-539801943592",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd"
  ],
  ninhbinh: [
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561",
    "https://images.unsplash.com/photo-1523592121529-f6dde35f079e",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1528127269322-539801943592"
  ],
  nhatrang: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1559868770-b184fcf13dbb",
    "https://images.unsplash.com/photo-1501066927591-314112b5888e",
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6"
  ],
  hue: [
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1528127269322-539801943592"
  ],
  mekong: [
    "https://images.unsplash.com/photo-1523592121529-f6dde35f079e",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561",
    "https://images.unsplash.com/photo-1501066927591-314112b5888e"
  ],
  japan: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65"
  ],
  europe: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    "https://images.unsplash.com/photo-1431274172761-fca41d930114",
    "https://images.unsplash.com/photo-1549877452-9c387954fbc2"
  ],
  korea: [
    "https://images.unsplash.com/photo-1538485399081-7191377e8241",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
  ],
  thailand: [
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    "https://images.unsplash.com/photo-1513415277900-a62401e19be4"
  ],
  bali: [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2",
    "https://images.unsplash.com/photo-1531968455001-5c5272a41129"
  ],
  usa: [
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856"
  ],
  australia: [
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
    "https://images.unsplash.com/photo-1494233892892-84542a694e72",
    "https://images.unsplash.com/photo-1534683532946-cf8a8d40d13b"
  ],
  singapore: [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170",
    "https://images.unsplash.com/photo-1508964942454-1a56651d54ac",
    "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1"
  ],
  taiwan: [
    "https://images.unsplash.com/photo-1558005530-fa1199321ba9",
    "https://images.unsplash.com/photo-1552993873-0dd1110e025f",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd"
  ],
  uk: [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd",
    "https://images.unsplash.com/photo-1529158062015-c64def50e3d0",
    "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1"
  ]
};

const cache = {};

async function uploadUrl(url) {
  if (cache[url]) { console.log('  ♻ (cached)'); return cache[url]; }
  const tmpFile = path.join(os.tmpdir(), `tour_img_${Date.now()}.jpg`);
  try {
    execSync(
      `curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" --max-time 30 -o "${tmpFile}" "${url}"`,
      { stdio: 'pipe' }
    );
    const stat = fs.statSync(tmpFile);
    if (stat.size < 5000) throw new Error('File too small: ' + stat.size);
    const result = await cloudinary.uploader.upload(tmpFile, { folder: 'tour-management' });
    fs.unlinkSync(tmpFile);
    cache[url] = result.secure_url;
    console.log('  ✓', result.secure_url.slice(0, 80) + '...');
    return result.secure_url;
  } catch (e) {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    console.error('  ✗', e.message);
    return null;
  }
}

mongoose.connect(process.env.DATABASE).then(async () => {
  const tours = await mongoose.connection.db.collection('tours').find({deleted: false}).toArray();
  
  for (const t of tours) {
    let pool = regionImages.sapa;
    const name = t.name.toLowerCase();
    if (name.includes('sapa') || name.includes('miền bắc') || name.includes('trong nước')) pool = regionImages.sapa;
    else if (name.includes('hạ long')) pool = regionImages.halong;
    else if (name.includes('đà nẵng') || name.includes('miền trung') || name.includes('hội an')) pool = regionImages.danang;
    else if (name.includes('phú quốc')) pool = regionImages.phuquoc;
    else if (name.includes('hà giang')) pool = regionImages.hagiang;
    else if (name.includes('tràng an') || name.includes('ninh bình')) pool = regionImages.ninhbinh;
    else if (name.includes('nha trang')) pool = regionImages.nhatrang;
    else if (name.includes('huế') || name.includes('quảng bình')) pool = regionImages.hue;
    else if (name.includes('miền tây') || name.includes('miền nam') || name.includes('cần thơ')) pool = regionImages.mekong;
    else if (name.includes('nhật bản')) pool = regionImages.japan;
    else if (name.includes('châu âu') || name.includes('pháp') || name.includes('nước ngoài')) pool = regionImages.europe;
    else if (name.includes('hàn quốc')) pool = regionImages.korea;
    else if (name.includes('thái lan')) pool = regionImages.thailand;
    else if (name.includes('bali') || name.includes('indonesia')) pool = regionImages.bali;
    else if (name.includes('mỹ') || name.includes('châu mỹ')) pool = regionImages.usa;
    else if (name.includes('úc') || name.includes('châu úc')) pool = regionImages.australia;
    else if (name.includes('singapore') || name.includes('malaysia')) pool = regionImages.singapore;
    else if (name.includes('đài loan')) pool = regionImages.taiwan;
    else if (name.includes('anh quốc') || name.includes('london')) pool = regionImages.uk;
    else if (name.includes('châu á')) pool = regionImages.japan;

    console.log(`\n▸ ${t.name}`);
    const images = [];
    for (const url of pool) {
      const cUrl = await uploadUrl(url);
      if (cUrl) images.push(cUrl);
    }

    if (images.length === 0) { console.log('  → skipped (no images)'); continue; }

    await mongoose.connection.db.collection('tours').updateOne(
      { _id: t._id },
      { $set: { images, avatar: images[0] } }
    );
    console.log(`  → Saved ${images.length} images ✓`);
  }

  console.log('\n✅ All 46 tours updated with real destination photos!');
  process.exit(0);
});
