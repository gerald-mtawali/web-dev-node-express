const http = require("http");
const PORT = process.env.port || 3000;
const fs = require("fs");

function serveStaticFile(res, path, contentType, responseCode = 200) {
    // use the async file reading method readFile 
    fs.readFile(__dirname + path, (err, data) => {
        // error handling
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("500 - Internal Error");
        }
        // send the data as a response
        res.writeHead(responseCode, { "Content-Type": contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end('Hello World from your Dev Machine');
    // normalize the url by removing the querystring, optional trailing slash,
    // making it lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
        case "":
            serveStaticFile(res, "/public/home.html", "text/html");
            break;
        case "/about":
            serveStaticFile(res, "/public/about.html", "text/html");
            break;
        case "/img/logo.png":
            serveStaticFile(res, "/public/img/tomato.png", "image/png");
            break;
        default:
            serveStaticFile(res, "/public/404.html", "text/html", 404);
            break;
    }
});

// start the server
server.listen(PORT, () =>
    console.log(
        `Server started on port ${PORT};` + `\nPress Ctrl-C to terminate the server`
    )
);
