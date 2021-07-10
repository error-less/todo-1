const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = new mongoose.Schema({
    name: String
  });

const Item = mongoose.model('Item', itemsSchema);

const item1= new Item({
    name:"welcome to todo"
})
const item2= new Item({
    name:"hello there!"
})
const item3= new Item({
    name:"Add your todo"
})

const defaultitems=[item1,item2,item3]

app.get('/', (req, res) => {
    Item.find({},function(err,founditems){

        if(founditems.length===0){
            Item.insertMany(defaultitems,function(err){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("successfully create db")
                }
            })
            res.redirect('/');
        }
        else{
        res.render("list", {
            listtitle: "Today",
            listitems:founditems
        });
    }
    })
   
})
app.get('/work',(req, res)=>{
    res.render("list", {
        listtitle: "work",
        listitems:workitems
    })
})
app.post('/', (req, res) => {
    var itemname =req.body.task
     const item=new Item({
         name:itemname
     })
     item.save()
     res.redirect('/')
    
})
app.post('/delete',(req, res)=>{
    const checkeditem=req.body.checkbox

    Item.findByIdAndRemove(checkeditem,function(err){
        if(!err){
            console.log("no errors")
            res.redirect('/');
        }
    });
    
})

app.listen(3030, () => {
    console.log('running on port 3030')
})