var express         =require("express"),
    app             =express(),
    bodyparser      =require("body-parser"),
    mongoose        =require("mongoose"),
    passport        =require("passport"),
    localStrategy   =require("passport-local"),
    User            =require("./models/User"),    
    flash            =require("connect-flash"),    
    methodOverride  =require("method-override"),
    seedDB          =require("./seeds")
  //seedDB();

var campgroundRoutes=require("./routes/Campgrounds"),
    commentRoutes=require("./routes/Comments"),
    indexRoutes=require("./routes/index")
require('dotenv').config()
app.use(bodyparser.urlencoded({extended:true}));
console.log(process.env.DATABASEURL)

mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


//passport configuration
app.use(require("express-session")({
    secret:"Web Development",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT || 4000,process.env.IP, function(){
    console.log("server has started on port:"+process.env.PORT);
});
