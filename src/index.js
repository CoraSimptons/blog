const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');

// connect db
const db = require('./config/db');
db.connect();

// static file
app.use(express.static(path.join(__dirname, 'public')));

// middleware, form gửi lên
// body chưa có sẵn như query
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// js gửi lên (xmlhttprequest, axios)
app.use(express.json());

// http logger
//app.use(morgan('combined'))

// template engine
app.engine(
    'hbs',
    engine(
        // congig file name
        { extname: '.hbs' },
    ),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
