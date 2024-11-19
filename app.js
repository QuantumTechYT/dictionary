const express = require('express');
const Unblocker = require('unblocker');

// Create Express Server
const app = express();

// Custom middleware to set headers
function setCustomHeaders(data) {
    data.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36';
    data.headers['accept-language'] = 'en-US,en;q=0.9';
}

// Create Unblocker Instance
const unblocker = new Unblocker({
    prefix: '/proxy/',
    requestMiddleware: [
        setCustomHeaders
    ]
});

// Serve static files from 'public' directory
app.use(express.static('public'));

// Use unblocker middleware
app.use(unblocker);

// Start server
const port = process.env.PORT || 8080;
app.listen(port).on('upgrade', unblocker.onUpgrade);
console.log(`Proxy server running on port: ${port}`); 