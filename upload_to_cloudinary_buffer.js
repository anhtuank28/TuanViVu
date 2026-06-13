require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const https = require('https');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cache = {};

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return resolve(downloadImage(response.headers.location));
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
  if (cache[url]) return cache[url];
  if (!url.includes('unsplash.com')) return url;
  
  try {
    const buffer = await downloadImage(url);
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'tour-management' },
        (error, result) => {
          if (error) return reject(error);
          cache[url] = result.secure_url;
          console.log("Uploaded from buffer:", result.secure_url);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("Cloudinary upload error for", url, err.message);
    return url;
  }
}

mongoose.connect(process.env.DATABASE).then(async () => {
  const tours = await mongoose.connection.db.collection('tours').find({deleted: false}).toArray();
  for (let t of tours) {
    let newImages = [];
    if (t.images && Array.isArray(t.images)) {
      for (let img of t.images) {
        let cUrl = await uploadToCloudinary(img);
        newImages.push(cUrl);
      }
    }
    
    let newAvatar = t.avatar;
    if (t.avatar && t.avatar.includes('unsplash.com')) {
      newAvatar = await uploadToCloudinary(t.avatar);
    }
    
    if (!newAvatar && newImages.length > 0) {
      newAvatar = newImages[0];
    }
    
    await mongoose.connection.db.collection('tours').updateOne(
      {_id: t._id}, 
      {$set: {images: newImages, avatar: newAvatar}}
    );
    console.log(`Updated tour ${t.name}`);
  }
  console.log("Successfully migrated ALL unsplash images to Cloudinary via buffers!");
  process.exit(0);
});
