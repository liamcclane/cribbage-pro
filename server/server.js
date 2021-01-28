let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, './../client/dist/client')));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./../client/dist/client/index.html"))
});

app.listen(9000, () => {
    console.log('server on port 9000');
});