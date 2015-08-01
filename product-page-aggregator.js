Products = new Mongo.Collection('products');

if (Meteor.isClient) {
    Meteor.startup(function(){
      Session.set('dataLoaded', false);
    });

  
    var productList = [];

    Meteor.subscribe('liveProducts', function(){
        Session.set('dataLoaded', Products.find().fetch());
          var array = Products.find().fetch();
          var arrayOfObjects = [];
  
        for (var i = 0; i < array.length; i++) {

          if (array[i].images === undefined) {
            Products.remove(array[i]._id);
            continue; 
          }

          console.log('sup1', array[i]);
          console.log('sup2', array[i].images);
  
          var url = array[i].images[0].url;
          arrayOfObjects.push(array[i]);
          arrayOfObjects[i].image = url;
        }

        Session.set('arrayOfObjects', arrayOfObjects);
    });

    Template.body.helpers({
      products: function(){
        return Session.get('arrayOfObjects');
      }
    });
}



if (Meteor.isServer) {
     Meteor.publish('liveProducts', function() {
      // return Products.remove({});

      return Products.find({}, {limit: 100});
    });

  Meteor.startup(function () {

    //These are HTTP calls to Diffbot to load the database with example product pages.

    // code to run on server at startup
    // HTTP.get('http://api.diffbot.com/v3/product?token=19c08b6b8af2155e6b35859a437eeeb4&url=http://shop.guess.com/en/Catalog/View/women/discounts-deals/low-rise-power-skinny-jeans-with-silicone-rinse/WB1AB2R0YT2&', function(error, result)

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

