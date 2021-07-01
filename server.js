const express=require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    var d=new Date();
    var current_day=d.getDay()
    var day=""
    switch(current_day){
        case 0:
            day="sunday";
            break;
        case 1:
            day="Monday";
            break;
        case 2:
            day="Tuesday";
            break;
        case 3:
            day="Wednesday";
            break;
        case 4:
            day="Thursday";
            break;
        case 5:
            day="Friday";
            break;
        case 6:
            day="Saturday";
            break;
    }
    res.render("list",{day:day});
})

app.listen(5000,()=>{
    console.log('running on port 5000')
})