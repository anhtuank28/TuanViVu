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
    
    // We will generate exactly 4 images per tour using a unique lock
    for (let j = 1; j <= 4; j++) {
      let lockId = (i * 4) + j;
      let url = `https://loremflickr.com/800/600/landscape,nature,city/all?lock=${lockId}`;
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
    console.log(`Updated tour ${t.name} with ${newImages.length} images`);
  }
  console.log("Successfully downloaded and uploaded ALL images to Cloudinary!");
  process.exit(0);
});
