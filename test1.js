const http = require('http'); // Import http module

const server = http.createServer((req, res) => {
    // Set default content-type
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        res.write('<h1>Welcome to the Home Page of Node.js!</h1>');
    } 
    else if (req.url === '/about') {
        res.write('<h1>About Page: Learn more about Node.js!</h1>');
    } 
    else if (req.url === '/contact.html') {
        res.write('<h1>Contact Page: Get in touch with us!</h1>');
    } 
    else if (req.url === '/services') {
        res.write('<h1>Services Page: Explore our services!</h1>');
    } 
    else {
        // Override 200 with 404 for not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 - Page Not Found</h1>');
    }

    res.end(); // End the response
});

server.listen(4000, () => {
    console.log('✅ Server is running at: http://localhost:4000');
});
