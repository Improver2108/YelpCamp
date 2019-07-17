var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/User")
//root routes
router.get("/",function(req,res){
    res.render("Campgrounds/landing");
});


//auth routes

//register routes
router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            
            req.flash("error",err.message);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","You are successfull Registered! Welcome to the world of Campgrounds "+user.username);
                res.redirect("/campgrounds");
            });               
        }
        
    });
});

//login routes
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req,res){

});

//logout routes
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","You have been LogOut!");   
    res.redirect("/campgrounds");
});

//middle ware

module.exports=router