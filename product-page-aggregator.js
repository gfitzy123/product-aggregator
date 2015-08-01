
Products = new Mongo.Collection('products');


if (Meteor.isClient) {
    Meteor.startup(function(){
      Session.set('dataLoaded', false);
    });

    var productList = [];
    var arrayOfObjects = [];

      Meteor.subscribe('liveProducts', function(){
      Session.set('dataLoaded', Products.find().fetch());
      var array = Products.find().fetch();
   

        for (var i = 0; i < array.length; i++) {
          var url = array[i].product[0].images[0].url;
          arrayOfObjects.push(array[i].product[0]);
          arrayOfObjects[i].image = url;
          console.log('sds', arrayOfObjects)
        }

        Session.set('arrayOfObjects', arrayOfObjects);
          console.log('arrayofobjects', arrayOfObjects);
        });


    // Grab the collection
    // Put every property and value in an object
    // Create helper function, return every value in object in a template
    // Make a function that is reactive Products

    Template.body.price = function(){
      return Products.find().fetch()[1].product[0].offerPrice;
    };

    Template.body.helpers({
      
      products: function(){
        return Session.get('arrayOfObjects');
      }
      //Session get object
      //Return it to display on template
          
    });
      
        
        // console.log(products)
        // setInterval(function(){
        //   console.log(products)
        // }, 1000)
       
     
       
        // Template.body.helpers({
        //   returnProducts: function(){
        //     return JSON.stringify(Products.find().fetch()[0].product);
        //   }
        // });
   
}



if (Meteor.isServer) {
     Meteor.publish('liveProducts', function() {
      // return Products.remove({});
      return Products.find({});
    });
  Meteor.startup(function () {


    // code to run on server at startup
    // HTTP.get('http://api.diffbot.com/v3/product?token=19c08b6b8af2155e6b35859a437eeeb4&url=http://shop.guess.com/en/Catalog/View/women/discounts-deals/low-rise-power-skinny-jeans-with-silicone-rinse/WB1AB2R0YT2&', function(error, result)

      // example product = http://shop.guess.com/en/Catalog/View/women/dresses/natasha-dress/54W7906073Z
      // example product2 = http://shop.guess.com/en/Catalog/View/women/dresses/sleeveless-pleated-zip-dress/W53K13K3JE0

    // HTTP.get('http://api.diffbot.com/v3/analyze?token=19c08b6b8af2155e6b35859a437eeeb4&url=http://shop.guess.com/en/Catalog/View/women/dresses/natasha-dress/54W7906073Z&mode=product&discussion=false', function(error, result) {
    //   console.log('result.content.objects', result.content)
    //   var exampleProduct = JSON.parse(result.content);
    //   // console.log('this is the object', exampleProduct.objects);
    //   Products.insert({product: exampleProduct.objects});
    // });
    

    // HTTP.get('http://api.diffbot.com/v3/analyze?token=19c08b6b8af2155e6b35859a437eeeb4&url=http://shop.guess.com/en/Catalog/View/women/dresses/sleeveless-pleated-zip-dress/W53K13K3JE0&mode=product&discussion=false', function(error, result) {
    //   console.log('result.content.objects', result.content)
    //   var exampleProduct = JSON.parse(result.content);
    //   // console.log('this is the object', exampleProduct.objects);
    //   Products.insert({product: exampleProduct.objects});
    // });
 
  });
}

// Store crawl in database.
// Grab image, title, - append to div in page
// Create new route for clickable image - fetch product page from database