const Category = require("../../models/category.model");
const Tour = require("../../models/tour.model");
const City = require("../../models/city.model");
const moment = require("moment");

module.exports.list=async (req,res)=>{
    
    const slug=req.params.slug;

    const category=await Category.findOne({
        slug:slug,
        deleted:false,
        status:"active"
    })

    if(category){
        const bannerImages = {
            "tour-trong-nuoc": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907685/tours/ifir8lqnyf9knxtniwbr.jpg",
            "tour-nuoc-ngoai": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907687/tours/cnbsrsdla64i6lqni2vx.jpg",
            "mien-bac": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907694/tours/tgp9vs79kifu1lmiazxl.jpg",
            "mien-trung": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907690/tours/iw1k2dyraxxugo7txzr6.jpg",
            "mien-nam": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907690/tours/iw1k2dyraxxugo7txzr6.jpg",
            "chau-a": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907691/tours/g05cdlb765kgjvbbc3mr.jpg",
            "chau-au": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907687/tours/cnbsrsdla64i6lqni2vx.jpg",
            "chau-my": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907692/tours/rl76viga6usxnlhbpffh.jpg",
            "chau-uc": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907693/tours/cg5y4ltjvu22bzy028z5.jpg",
            "default": "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907694/tours/tgp9vs79kifu1lmiazxl.jpg"
        };
        
        const bannerImage = bannerImages[category.slug] || bannerImages["default"];

            //Breadcumb
    const breadcrumb={
        image:bannerImage,
        title:category.name,
        list:[
            {
                link:"/",
                title:"Trang chủ"
            }
        ]
    };
    // Lấy toàn bộ các danh mục cha bằng vòng lặp while (Hỗ trợ đa cấp)
    let currentCategory = category;
    const parentCategories = [];

    while (currentCategory.parent) {
        currentCategory = await Category.findOne({
            _id: currentCategory.parent,
            deleted: false,
            status: "active"
        });

        if (currentCategory) {
            parentCategories.unshift(currentCategory); // unshift để các cha lớn nhất nằm đầu mảng
        } else {
            break;
        }
    }

    // Nạp các danh mục cha vào list
    for (const parent of parentCategories) {
        breadcrumb.list.push({
            link: `/category/${parent.slug}`,
            title: parent.name
        });
    }

    // Nạp danh mục hiện tại vào list cuối cùng
    breadcrumb.list.push({
        link: `/category/${category.slug}`,
        title: category.name
    });
    //end breadcumb

    // Pagination logic
    let page = parseInt(req.query.page) || 1;
    let limit = 6; // Display 6 tours per page
    let skip = (page - 1) * limit;

    // Lấy danh sách các Tour thuộc danh mục này
    const tourList = await Tour.find({
        category: category.id,
        deleted: false,
        status: "active"
    })
    .skip(skip)
    .limit(limit);
    
    tourList.forEach(item => {
        if(item.departureDate) {
            item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
        }
    });

    const cityList = await City.find({});

    // Lấy danh sách các điểm đến (locations) duy nhất của các tour trong danh mục này
    const destinationList = await Tour.distinct("locations", {
        category: category.id,
        deleted: false,
        status: "active"
    });

    const totalTour = await Tour.countDocuments({
        category: category.id,
        deleted: false,
        status: "active"
    });

    const totalPages = Math.ceil(totalTour / limit);

    res.render("client/pages/tour-list", {
        pageTitle: category.name,
        breadcrumb: breadcrumb,
        tourList: tourList,
        category:category,
        cityList: cityList,
        destinationList: destinationList,
        totalTour: totalTour,
        page: page,
        totalPages: totalPages
    });
    }else{
        res.redirect("/");
    }

   
}