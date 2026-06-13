require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cache = {};

async function uploadToCloudinary(url) {
  if (cache[url]) return cache[url];
  if (!url.includes('unsplash.com')) return url; // Already processed or not unsplash
  
  try {
    const result = await cloudinary.uploader.upload(url, { folder: 'tour-management' });
    cache[url] = result.secure_url;
    console.log("Uploaded:", result.secure_url);
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error for", url, err);
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
    
    // If the avatar is totally broken or empty, let's just pick the first image as avatar!
    if (!newAvatar && newImages.length > 0) {
      newAvatar = newImages[0];
    }
    
    await mongoose.connection.db.collection('tours').updateOne(
      {_id: t._id}, 
      {$set: {images: newImages, avatar: newAvatar}}
    );
    console.log(`Updated tour ${t.name}`);
  }
  console.log("Successfully migrated all images to Cloudinary!");
  process.exit(0);
});
