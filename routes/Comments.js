var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/Campground");
var Comment=require("../models/Comment");
var middleware=require("../middleware");
//comments create

router.post("/",middleware.isLoggedIn,function (req,res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            req.flash("error","There has been some error!");
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","There has been some error!");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully posted your new Comment!");
                    
                    res.redirect("/campgrounds/"+campground._id);
                }                
            });
        }
    });
});

//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("Comments/new",{campground:foundCampground});;                        
        }
    });
});

router.get("/:comment_id/edit",middleware.commentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        res.render("Comments/edit",{campground_id:req.params.id,comment:foundComment});                
    });       
});

router.put("/:comment_id",middleware.commentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,editedComment){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success","Successfully updated your Comment!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.commentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            req.flash("success","Successfully deleted your Comment!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports=router;