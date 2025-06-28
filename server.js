const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Serve the feedback form
        fs.readFile('./form.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                return res.end("Error loading form");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    else if (req.url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            console.log('Feedback received:', formData);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Thank you, ${formData.name}!</h1><p>Your Feedback: ${formData.message}</p>`);
        });
    }

    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page: Learn more about Node.js!</h1>');
    }

    else if (req.url === '/services') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Services Page: Explore our services!</h1>');
    }

    else if (req.url === '/contact.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Contact Page: Get in touch with us!</h1>');
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

server.listen(4000, () => {
    console.log(' Server is running at: http://localhost:4000');
});
