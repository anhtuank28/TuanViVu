require('dotenv').config();
const mongoose = require('mongoose');

const imagePools = {
  sapa: [
    "https://images.unsplash.com/photo-1558235212-cd12f462bbfa?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543661841-f633a651911d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570776594247-c0e8a719ab27?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621251347634-8c887de64789?q=80&w=2070&auto=format&fit=crop"
  ],
  halong: [
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=2147&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550604169-798836ec3b73?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566324424911-37f717d98d24?q=80&w=2069&auto=format&fit=crop"
  ],
  danang: [
    "https://images.unsplash.com/photo-1563842163158-18e388ff5934?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2105&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562912423-f366114eb1af?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605364132447-f010f3c589cb?q=80&w=2070&auto=format&fit=crop"
  ],
  phuquoc: [
    "https://images.unsplash.com/photo-1600869629080-692ab86f2648?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598287532306-44ecf14eeb5c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595180479758-c67d60f54070?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600571617482-1598177df609?q=80&w=2070&auto=format&fit=crop"
  ],
  hagiang: [
    "https://images.unsplash.com/photo-1542456424-df3787754f91?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582298538104-5f532a2f8c5c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634620863777-62f928e4e9ff?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1644330104921-655f05b0cdd9?q=80&w=2070&auto=format&fit=crop"
  ],
  ninhbinh: [
    "https://images.unsplash.com/photo-1576487248805-fd072eb2e873?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583417646193-455b5d1e44f4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599540026362-a56e0d29ab6e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525048992688-64c8d8b3f114?q=80&w=2070&auto=format&fit=crop"
  ],
  nhatrang: [
    "https://images.unsplash.com/photo-1598288597380-49603e670d51?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559868770-b184fcf13dbb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601725287515-585bbccf7e8a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622699897285-d6ee6ab2d5bb?q=80&w=2070&auto=format&fit=crop"
  ],
  hue: [
    "https://images.unsplash.com/photo-1559405051-fb81453ab498?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600201397775-1cc888fc8cb9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1650381440624-9b244d2d4f29?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579294273574-eab8ff593a12?q=80&w=2070&auto=format&fit=crop"
  ],
  mientay: [
    "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614002621458-15c0e1db46b1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580979502206-89ba0a6e300d?q=80&w=2070&auto=format&fit=crop"
  ],
  japan: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=2071&auto=format&fit=crop"
  ],
  europe: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515542622106-78b28af7815b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=2076&auto=format&fit=crop"
  ],
  korea: [
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2056&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515096788709-a3cf4ce0a4a6?q=80&w=2116&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop"
  ],
  thailand: [
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=2067&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543888373-c15764d8a213?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510825316041-37d40fc80ef8?q=80&w=2071&auto=format&fit=crop"
  ],
  bali: [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?q=80&w=2050&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop"
  ],
  usa: [
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1474433188271-d3f339f41911?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop"
  ],
  australia: [
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524820197278-540916411e20?q=80&w=2095&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop"
  ],
  singapore: [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1952&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530866579294-81786e2467d1?q=80&w=2070&auto=format&fit=crop"
  ],
  taiwan: [
    "https://images.unsplash.com/photo-1558005530-fa1199321ba9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552993873-0dd1110e025f?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582236371520-a6125da0d694?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577784381368-809cc28c9b36?q=80&w=2071&auto=format&fit=crop"
  ],
  uk: [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529158062015-c64def50e3d0?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505676366547-0631fb285324?q=80&w=2070&auto=format&fit=crop"
  ]
};

mongoose.connect(process.env.DATABASE).then(async () => {
  const tours = await mongoose.connection.db.collection('tours').find({deleted: false}).toArray();
  for (let t of tours) {
    let pool = imagePools.sapa; // default
    let name = t.name.toLowerCase();
    if (name.includes('sapa') || name.includes('miền bắc')) pool = imagePools.sapa;
    else if (name.includes('hạ long')) pool = imagePools.halong;
    else if (name.includes('đà nẵng') || name.includes('miền trung')) pool = imagePools.danang;
    else if (name.includes('phú quốc')) pool = imagePools.phuquoc;
    else if (name.includes('hà giang')) pool = imagePools.hagiang;
    else if (name.includes('tràng an')) pool = imagePools.ninhbinh;
    else if (name.includes('nha trang')) pool = imagePools.nhatrang;
    else if (name.includes('huế')) pool = imagePools.hue;
    else if (name.includes('miền tây') || name.includes('miền nam')) pool = imagePools.mientay;
    else if (name.includes('nhật bản')) pool = imagePools.japan;
    else if (name.includes('châu âu') || name.includes('pháp')) pool = imagePools.europe;
    else if (name.includes('hàn quốc')) pool = imagePools.korea;
    else if (name.includes('thái lan')) pool = imagePools.thailand;
    else if (name.includes('bali')) pool = imagePools.bali;
    else if (name.includes('mỹ') || name.includes('châu mỹ')) pool = imagePools.usa;
    else if (name.includes('úc') || name.includes('châu úc')) pool = imagePools.australia;
    else if (name.includes('singapore') || name.includes('malaysia')) pool = imagePools.singapore;
    else if (name.includes('đài loan')) pool = imagePools.taiwan;
    else if (name.includes('anh quốc')) pool = imagePools.uk;
    else if (name.includes('nước ngoài')) pool = imagePools.europe;
    else if (name.includes('châu á')) pool = imagePools.japan;
    else if (name.includes('trong nước')) pool = imagePools.sapa;
    
    await mongoose.connection.db.collection('tours').updateOne({_id: t._id}, {$set: {images: pool}});
  }
  console.log("Updated images for", tours.length, "tours!");
  process.exit(0);
});
