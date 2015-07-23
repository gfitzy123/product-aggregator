Products = new Mongo.Collection('products');

if (Meteor.isClient) {
      // var storedObject = Products.find(product);
      // console.log('returning products collection', storedObject);


      var allProducts = Products.find({});
      var product = JSON.stringify(Products.find().fetch());
      var sup = 'sdsfsdf'
      // Meteor.subscribe('liveProducts');

      Template.body.helpers({
            tasks: [
            { price: product[0].product },
            { price: 'sup'}
          ],
        });

    Template.product.helpers({
      example: function(){
        var hello = JSON.stringify(Products.find().fetch());

        // console.log(hello);
        return hello;
          // var products = Products.find();
          // var array = [];
          // products.forEach(function(result){
          //   console.log(result);
          //   array.push(result)
          // });
          // console.log(array)
          // return array;
    }
   
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    // HTTP.get('http://api.diffbot.com/v3/product?token=19c08b6b8af2155e6b35859a437eeeb4&url=http://shop.guess.com/en/Catalog/View/women/discounts-deals/low-rise-power-skinny-jeans-with-silicone-rinse/WB1AB2R0YT2&', function(error, result) {
    //   console.log('result.content.objects', result.content)
    //   var exampleProduct = JSON.parse(result.content);
    //   // console.log('this is the object', exampleProduct.objects);
    //   Products.insert({product: exampleProduct.objects});
    // });

    Meteor.publish('liveProducts', function() {
      return Products.find({});
    });
  });
}

// Store crawl in database.
// Grab image, title, - append to div in page
// Create new route for clickable image - fetch product page from database