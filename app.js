const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Create a list of menu items
const menuItems = [
  { title: 'Home', path: '/' },
  { title: 'Weddings', path: '/Weddings' },
  { title: 'Engagements', path: '/Engagements' },
  { title: 'Birthdays', path: '/Birthdays' },
  { title: 'About', path: '/About' },
  { title: 'Contact', path: '/Contact' }
];

// Define a common HTML template for the menu and content
function generatePageContent(title, content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>${title} - TEJA STUDIO</title>
      </head>
      <body>
        <header>
          <h1>TEJA STUDIO</h1>
          <nav>
            <ul>
              ${menuItems.map(item => `<li><a href="${item.path}">${item.title}</a></li>`).join('')}
            </ul>
          </nav>
        </header>
        <main>
          <div class="content">
            ${content}
          </div>
        </main>
        <footer>
          &copy; ${new Date().getFullYear} TEJA STUDIO
        </footer>
      </body>
    </html>
  `;
}

// Define routes and handlers
app.get('/', function (req, res) {
  const content = '<p>Welcome to TEJA STUDIO - Home Page</p>';
  res.send(generatePageContent('Home', content));
});

app.get('/Weddings', function (req, res) {
  const content = '<p>Weddings Page Content</p>';
  res.send(generatePageContent('Weddings', content));
});

app.get('/Engagements', function (req, res) {
  const content = '<p>Engagements Page Content</p>';
  res.send(generatePageContent('Engagements', content));
});

app.get('/Birthdays', function (req, res) {
  const content = '<p>Birthdays Page Content</p>';
  res.send(generatePageContent('Birthdays', content));
});

app.get('/About', function (req, res) {
  const content = '<p>About Us Page Content</p>';
  res.send(generatePageContent('About', content));
});

app.get('/Contact', function (req, res) {
  const content = '<p>Contact Us Page Content</p>';
  res.send(generatePageContent('Contact', content));
});

app.use('/static', express.static('public'));

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app;
