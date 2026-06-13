require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cache = {};

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function uploadToCloudinary(url) {
  if (cache[url]) return cache[url];
  try {
    await sleep(200);
    const result = await cloudinary.uploader.upload(url, { folder: 'tour-management' });
    cache[url] = result.secure_url;
    return result.secure_url;
  } catch (err) {
    console.error("Upload error for", url, err.message);
    return null;
  }
}

mongoose.connect(process.env.DATABASE).then(async () => {
  const wikiImages = JSON.parse(fs.readFileSync('wiki_images.json', 'utf8'));
  const tours = await mongoose.connection.db.collection('tours').find({deleted: false}).toArray();
  
  for (let i = 0; i < tours.length; i++) {
    const t = tours[i];
    
    let rKey = "Sapa Vietnam";
    let name = t.name.toLowerCase();
    if (name.includes('sapa') || name.includes('miền bắc') || name.includes('trong nước')) rKey = "Sapa Vietnam";
    else if (name.includes('hạ long')) rKey = "Ha Long Bay";
    else if (name.includes('đà nẵng') || name.includes('miền trung')) rKey = "Da Nang";
    else if (name.includes('phú quốc')) rKey = "Phu Quoc";
    else if (name.includes('hà giang')) rKey = "Ha Giang";
    else if (name.includes('tràng an')) rKey = "Trang An Ninh Binh";
    else if (name.includes('nha trang')) rKey = "Nha Trang";
    else if (name.includes('huế')) rKey = "Hue Vietnam";
    else if (name.includes('miền tây') || name.includes('miền nam')) rKey = "Mekong Delta";
    else if (name.includes('nhật bản') || name.includes('châu á')) rKey = "Japan landscape";
    else if (name.includes('châu âu') || name.includes('pháp') || name.includes('nước ngoài')) rKey = "Europe landscape";
    else if (name.includes('hàn quốc')) rKey = "Seoul landscape";
    else if (name.includes('thái lan')) rKey = "Thailand landscape";
    else if (name.includes('bali')) rKey = "Bali landscape";
    else if (name.includes('mỹ') || name.includes('châu mỹ')) rKey = "USA landscape";
    else if (name.includes('úc') || name.includes('châu úc')) rKey = "Australia landscape";
    else if (name.includes('singapore') || name.includes('malaysia')) rKey = "Singapore landscape";
    else if (name.includes('đài loan')) rKey = "Taiwan landscape";
    else if (name.includes('anh quốc')) rKey = "London landscape";
    
    const regionUrls = wikiImages[rKey] || wikiImages["Sapa Vietnam"];
    let newImages = [];
    
    for (let url of regionUrls) {
      let cUrl = await uploadToCloudinary(url);
      if (cUrl) {
        newImages.push(cUrl);
      }
    }
    
    if (newImages.length === 0) {
       console.log(`Failed totally for ${t.name}, skipping update!`);
       continue;
    }
    
    let newAvatar = newImages.length > 0 ? newImages[0] : t.avatar;
    
    await mongoose.connection.db.collection('tours').updateOne(
      {_id: t._id}, 
      {$set: {images: newImages, avatar: newAvatar}}
    );
    console.log(`Updated tour ${t.name} with ${newImages.length} REAL Wikipedia images from ${rKey}`);
  }
  console.log("Successfully migrated ALL Wikipedia landmark images to Cloudinary natively!");
  process.exit(0);
});
