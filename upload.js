const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const urls = [
    "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583417657209-e16eb71c8ee9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535728795551-78fb8f3ecde5?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e907a5ea020?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop"
];

async function uploadAll() {
    let result = {};
    for (let url of urls) {
        try {
            console.log(`Uploading ${url}...`);
            const response = await cloudinary.uploader.upload(url, { folder: "tours" });
            result[url] = response.secure_url;
        } catch (e) {
            console.error(e);
        }
    }
    const fs = require('fs');
    fs.writeFileSync('cloudinary_map.json', JSON.stringify(result, null, 2));
    console.log('Saved to cloudinary_map.json');
}

uploadAll();
