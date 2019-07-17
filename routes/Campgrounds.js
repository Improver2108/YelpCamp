var express=require("express");
var router=express.Router();
var Campground=require("../models/Campground");
var middleware=require("../middleware");

//create campgrounds
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampgrounds={name:name,image:image,description:description,author:author};
    Campground.create(newCampgrounds,function(err,campground){
        if(err){
            req.flash("error","There has been some error!");
            console.log(err);
        }
        else{
            req.flash("success","Successfully created your new Campground!");
            res.redirect("/campgrounds");
        }
    })
    
});
//new route
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("Campgrounds/new");
});
//index route
router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err){
            req.flash("error","There has been some error!");
            console.log(err);
        }
        else{
            res.render("Campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});
//show route
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            req.flash("error","There has been some error!");
            console.log(err);
        }
        else{
            res.render("Campgrounds/show",{campground:foundCampground});
        }
    });     
});

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("Campgrounds/edit",{campground:foundCampground})                       
    });
});   
    

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            req.flash("error","There has been some error!");
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Successfully updated your specied Campground!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){

            res.redirect("/campgrounds");
        }else{
            req.flash("success","Successfully deleted your specied Campground!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports=router;