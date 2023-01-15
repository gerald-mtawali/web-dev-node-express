const express = require('express'); 

const app = express(); 

const port = process.env.PORT || 3000 


// route to homepage
app.get('/', (req, res) => {
    res.type('text/plain'); 
    res.send('Meadowlark Travel');
}); 

app.get('/about', (req, res) => {
    res.type('text/plain'); 
    res.send('About Meadowlark Travel');
}); 


// create a custom 404 page
app.use((res, req) => {
    res.type('text/plain'); 
    res.status(404); 
    res.send('404 - Not Found')
}); 

// custom 500 page 
app.use((err, req, res, next) => {
    console.error(err.message); 
    res.status(500); 
    res.send('500 - Server Error');
}); 


 
// start the server
app.listen(port, () =>
    console.log(
        `Server started on port ${port};` + `\nPress Ctrl-C to terminate the server`
    )
);