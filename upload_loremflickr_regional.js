require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const https = require('https');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const { URL } = require('url');
          redirectUrl = new URL(redirectUrl, url).href;
        }
        return resolve(downloadImage(redirectUrl));
      }
      if (response.statusCode !== 200) {
        return reject(new Error('Failed to download: ' + response.statusCode));
      }
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function uploadToCloudinary(url) {
  try {
    const buffer = await downloadImage(url);
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'tour-management' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("Upload error for", url, err.message);
    return null;
  }
}

mongoose.connect(process.env.DATABASE).then(async () => {
  const tours = await mongoose.connection.db.collection('tours').find({deleted: false}).toArray();
  for (let i = 0; i < tours.length; i++) {
    const t = tours[i];
    let newImages = [];
    
    // Determine the keyword from the tour name
    let keyword = 'vietnam,landscape';
    let name = t.name.toLowerCase();
    if (name.includes('sapa')) keyword = 'sapa,landscape';
    else if (name.includes('hạ long')) keyword = 'halong,landscape';
    else if (name.includes('đà nẵng') || name.includes('bà nà')) keyword = 'danang,landscape';
    else if (name.includes('phú quốc')) keyword = 'phuquoc,landscape';
    else if (name.includes('hà giang')) keyword = 'hagiang,landscape';
    else if (name.includes('tràng an') || name.includes('ninh bình')) keyword = 'ninhbinh,landscape';
    else if (name.includes('nha trang')) keyword = 'nhatrang,landscape';
    else if (name.includes('huế')) keyword = 'hue,landscape';
    else if (name.includes('miền tây') || name.includes('cần thơ')) keyword = 'mekong,landscape';
    else if (name.includes('nhật bản') || name.includes('tokyo')) keyword = 'japan,landscape';
    else if (name.includes('châu âu') || name.includes('pháp')) keyword = 'europe,landscape';
    else if (name.includes('hàn quốc') || name.includes('seoul')) keyword = 'seoul,landscape';
    else if (name.includes('thái lan') || name.includes('bangkok')) keyword = 'thailand,landscape';
    else if (name.includes('bali') || name.includes('indonesia')) keyword = 'bali,landscape';
    else if (name.includes('mỹ') || name.includes('châu mỹ')) keyword = 'usa,landscape';
    else if (name.includes('úc') || name.includes('châu úc') || name.includes('sydney')) keyword = 'australia,landscape';
    else if (name.includes('singapore') || name.includes('malaysia')) keyword = 'singapore,landscape';
    else if (name.includes('đài loan')) keyword = 'taiwan,landscape';
    else if (name.includes('anh quốc') || name.includes('london')) keyword = 'london,landscape';
    else if (name.includes('miền bắc')) keyword = 'hanoi,landscape';
    else if (name.includes('miền trung')) keyword = 'hoian,landscape';
    else if (name.includes('miền nam')) keyword = 'saigon,landscape';
    else if (name.includes('nước ngoài')) keyword = 'world,landscape';
    else if (name.includes('châu á')) keyword = 'asia,landscape';
    
    // We will generate exactly 4 images per tour using a unique lock
    for (let j = 1; j <= 4; j++) {
      let lockId = (i * 4) + j + 1000; // offset lock to ensure new images
      let url = `https://loremflickr.com/800/600/${keyword}/all?lock=${lockId}`;
      let cUrl = await uploadToCloudinary(url);
      if (cUrl) {
        newImages.push(cUrl);
      }
    }
    
    let newAvatar = newImages.length > 0 ? newImages[0] : t.avatar;
    
    await mongoose.connection.db.collection('tours').updateOne(
      {_id: t._id}, 
      {$set: {images: newImages, avatar: newAvatar}}
    );
    console.log(`Updated tour ${t.name} with ${newImages.length} images of ${keyword}`);
  }
  console.log("Successfully downloaded and uploaded REGIONAL images to Cloudinary!");
  process.exit(0);
});
