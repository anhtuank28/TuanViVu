const Tour = require("../../models/tour.model");
const City = require("../../models/city.model");
const Category = require("../../models/category.model");
const moment = require("moment");

module.exports.detail = async (req, res) => {
  const slug=req.params.slug;

  //tìm tour theo 
  const tourDetail=await Tour.findOne({
    slug:slug,
    status:"active",
    deleted:false
  })

  if(tourDetail){
    if (tourDetail.departureDate) {
      tourDetail.departureDateFormat = moment(tourDetail.departureDate).format("DD/MM/YYYY");
    }

    const breadcrumb={
      image: tourDetail.avatar,
      title: tourDetail.name,
      list:[
        {
          link: "/",
          title: "Trang chủ"
        }
      ]
    }

    if (tourDetail.category) {
      let currentCategory = await Category.findOne({
          _id: tourDetail.category,
          deleted: false,
          status: "active"
      });

      if (currentCategory) {
          const parentCategories = [currentCategory];
          
          while (currentCategory.parent) {
              currentCategory = await Category.findOne({
                  _id: currentCategory.parent,
                  deleted: false,
                  status: "active"
              });

              if (currentCategory) {
                  parentCategories.unshift(currentCategory);
              } else {
                  break;
              }
          }

          for (const parent of parentCategories) {
              breadcrumb.list.push({
                  link: `/category/${parent.slug}`,
                  title: parent.name
              });
          }
      }
    }

    breadcrumb.list.push({
        link: `/tour/detail/${tourDetail.slug}`,
        title: tourDetail.name
    });

    const cityList = await City.find({
      deleted: false,
      status: "active"
    });

    if (!tourDetail.images || tourDetail.images.length === 0) {
      tourDetail.images = [tourDetail.avatar];
    }

    let departureCity = null;
    if (tourDetail.locationFrom) {
        departureCity = await City.findOne({ _id: tourDetail.locationFrom });
    }

    res.render("client/pages/tour-detail.pug", {
      pageTitle: tourDetail.name,
      tourDetail: tourDetail,
      breadcrumb: breadcrumb,
      cityList: cityList,
      departureCity: departureCity
    });
  }else{
    res.redirect("/");
  }


  
};
