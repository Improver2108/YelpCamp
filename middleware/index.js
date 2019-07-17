var Campground=require("../models/Campground");
var Comment=require("../models/Comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","Specified Campground not found")
                res.redirect("back")
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","Oops! You don't have that permission");
                    res.redirect("back");
                }                
            }
        });   
    }else{
        req.flash("error","You need to be loggedIn to do that!");
        res.redirect("back");
    }   
}

middlewareObj.commentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("error","Specified Comment not found");
                res.redirect("back")
            }else{
                if(foundComment.author.id.equals(req.user._id)){                        
                    next();                          
                }else{
                    req.flash("error","Oops! You don't have that permission");
                    res.redirect("back");
                }      
            }                             
        });        
    }else{
        req.flash("error","You need to be loggedIn to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be loggedIn to do that!");
    return res.redirect("/login");
}

module.exports=middlewareObj;

    