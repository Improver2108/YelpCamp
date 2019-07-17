var mongoose=require("mongoose");
var Camground=require("./models/Campground");
var Comment=require("./models/Comment");
var data=[
    {
        name:"Waldseilgarten, Germany",
        image:"https://amp.insider.com/images/5b5654a351dfbe20008b466b-750-563.jpg",
        description:"If you're looking for a truly unique experience, you can't get any better than this one. Located in the German Alps, Waldseilgarten Höllschlucht allows you to try out tree camping, which means campers stay in tents that are hung from tree branches high up in the forest canopy. If you manage to get up there (by rope!), you'll get incredible views of the Pfronten mountains by the Austrian border.",
    },
    {
        name:"Simien Mountains in Ethiopia",
        image:"https://amp.insider.com/images/5b56525751dfbedb058b4683-960-720.jpg",
        description:"The Simien Mountains National Park is a UNESCO World Heritage Site and Ethiopia's most popular trekking destination. The scenery is absolutely gorgeous, and there is also a ton of exotic wildlife to check out, like monkeys, Ethiopian wolves, rare birds, and more. You can check out jagged cliffs and deep precipices. The best way to explore the park is to camp there.",
    },
    {
        name:"Jasper National Park in Canada",
        image:"https://amp.insider.com/images/5a70e21246a2883d038b4580-750-563.jpg",
        description:"Jasper National Park is the largest national parks in Canada and a beautiful camping destination. There's something for everyone, whether you want an adventurous back-country camping experience or something more luxurious, like oTENTiks, which are part tent, part cozy cabin.",
    },
]

function seedDB(){
    Camground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }else{
        //     console.log("Successfully removes Campgrounds");
        //     Comment.remove({},function(err){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log("Removes Comments as well");
        //             data.forEach(function(seed){
        //                 Camground.create(seed,function(err,campground){
        //                     if(err){
        //                         console.log(err);              
        //                     }else{
        //                         console.log("added a campground");
        //                         Comment.create({
        //                             title:"gand marao chole khao",
        //                             author:"mera beta gurpreet",
        //                         },function(err,comment){
        //                             if(err){
        //                                 console.log(err);                                
        //                             }else{
        //                                 campground.comments.push(comment);
        //                                 campground.save();
        //                                 console.log("created new comment");                                
        //                             }
        //                         }); 
        //                     }    
        //                 });
        //             });        

        //         }
        //     });
            
        // }
    });       
}
module.exports=seedDB;