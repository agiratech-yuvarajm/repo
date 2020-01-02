var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yuvi"
});

//POST method to create product details
app.use(bodyParser())
con.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/v1", function(req, res) {
con.query('INSERT INTO product_items (product_id,brand_name,product_name,qty,price) values (("'+req.body.product_id+'"),("'+req.body.brand_name+'"),("'+req.body.product_name+'"),("'+req.body.qty+'"),("'+req.body.price+'"))', function (err, result) {
    if(err){
      console.log(err)
      res.status(400).send('error');
        }else{
        console.log(result);
        res.send("new item added ")

      }
    });
});

//PUT method to update product items
app.put("/api/v1", function(req, response) {
var sql =  "UPDATE product_items SET qty = ('"+req.body.qty+"') WHERE product_id = ('"+req.body.product_id+"')";
con.query(sql, function (err, res) {
    if(err){
        res.status(400).send('error');
        }else{
        console.log("one item updated");
        response.send("success");
      }
  });
});

// GET method to list the product items
app.get('/api/v1',function(req,response){
  con.query("SELECT * FROM product_items", function(err,result){
    var res={}
       if(err){
         res.msg = "error"
           response.send(res)
         } else {
         products=[]
           for (r in result){
             pt = {}
             pt.product_id    = result[r].product_id;
             pt.brand_name    = result[r].brand_name;
             pt.product_name  = result[r].product_name;
             pt.qty           = result[r].qty;
             pt.price         = result[r].price;
             products.push(pt)
           }
         res.msg=(products)
         response.send(res)
       }
   });
});

//DELETE method to delete the  products
app.delete("/api/v1", function(req, response) {
var sql =  "DELETE from product_items WHERE product_name = ('"+req.body.product_name+"')";
con.query(sql, function (err, res) {
      if(err){
        res.status(400).send('error');
        }else{
        console.log("one item deleted");
        response.send("success");
      }
  });
});

app.listen(3005,function(){
console.log("listening to 3005");
});
