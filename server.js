const express = require('express');
const bodyParser=require('body-parser');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
var items = ["take breakfast","take bath"];
app.get('/', (req, res) => {
    var d = new Date();
    var options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const day=(d.toLocaleDateString('en-ZA', options));
    res.render("list", {
        kindday: day,
        listitems:items
    });
})
app.post('/', (req, res) => {
    var item =req.body.task
    items.push(item);
    res.redirect('/');
})

app.listen(3030, () => {
    console.log('running on port 3030')
})