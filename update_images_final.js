require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Sử dụng Cloudinary fetch - Cloudinary tự download và cache ảnh
// Format: https://res.cloudinary.com/<cloud>/image/fetch/<url>
// Các URL này đã được xác minh HTTP 200 bằng curl

const CLOUD = process.env.CLOUDINARY_NAME;
function fetchUrl(url) {
  return `https://res.cloudinary.com/${CLOUD}/image/fetch/f_auto,q_80,w_1200/${encodeURIComponent(url)}`;
}

// Tuyển chọn cẩn thận URL Unsplash đã xác minh hoạt động (HTTP 200)
const regionImages = {
  sapa: [
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200",
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1200",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200"
  ],
  halong: [
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1200",
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200"
  ],
  danang: [
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200"
  ],
  phuquoc: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200",
    "https://images.unsplash.com/photo-1501066927591-314112b5888e?w=1200",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200"
  ],
  hagiang: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200"
  ],
  ninhbinh: [
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1200",
    "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?w=1200",
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200"
  ],
  nhatrang: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1559868770-b184fcf13dbb?w=1200",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200"
  ],
  hue: [
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200",
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200"
  ],
  mekong: [
    "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1200",
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200"
  ],
  japan: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200"
  ],
  europe: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200",
    "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=1200",
    "https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=1200"
  ],
  korea: [
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200"
  ],
  thailand: [
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200",
    "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1200",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200",
    "https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=1200"
  ],
  bali: [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200",
    "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1200"
  ],
  usa: [
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200"
  ],
  australia: [
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200",
    "https://images.unsplash.com/photo-1494233892892-84542a694e72?w=1200",
    "https://images.unsplash.com/photo-1534683532946-cf8a8d40d13b?w=1200"
  ],
  singapore: [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200",
    "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200",
    "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=1200"
  ],
  taiwan: [
    "https://images.unsplash.com/photo-1558005530-fa1199321ba9?w=1200",
    "https://images.unsplash.com/photo-1552993873-0dd1110e025f?w=1200",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200"
  ],
  uk: [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1200",
    "https://images.unsplash.com/photo-1529158062015-c64def50e3d0?w=1200",
    "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1200"
  ]
};

// Convert to Cloudinary fetch URLs (stable, auto-cached by Cloudinary)
function makeImages(pool) {
  return pool.map(u => fetchUrl(u));
}

mongoose.connect(process.env.DATABASE).then(async () => {
  const tours = await mongoose.connection.db.collection('tours').find({deleted: false}).toArray();
  let updated = 0;
  
  for (let t of tours) {
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

    const images = makeImages(pool);
    const avatar = images[0];

    await mongoose.connection.db.collection('tours').updateOne(
      { _id: t._id },
      { $set: { images, avatar } }
    );
    console.log(`✓ ${t.name}`);
    updated++;
  }
  
  console.log(`\n✅ Done! Updated ${updated} tours with Cloudinary fetch URLs (regional destination images)`);
  process.exit(0);
});
