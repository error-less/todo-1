const express=require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render("list");
})

app.listen(5000,()=>{
    console.log('running on port 5000')
})