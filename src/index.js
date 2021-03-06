const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const app = express();

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');

// connect db
// const db = require('./config/db');
// db.connect();

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

//
app.use(methodOverride('_method'));

// custom middlewares
app.use(SortMiddleware);

// http logger
//app.use(morgan('combined'))

// template engine
app.engine(
    'hbs',
    engine(
        // congig file name
        {
            extname: '.hbs',
            helpers: {
                sum: (a, b) => a + b,
                sortable: (field, sort) => {
                    const sortType =
                        field === sort.column ? sort.type : 'default';

                    const icons = {
                        default: 'oi oi-elevator',
                        desc: 'oi oi-sort-descending',
                        asc: 'oi oi-sort-ascending',
                    };
                    const types = {
                        default: 'desc',
                        asc: 'desc',
                        desc: 'asc',
                    };
                    const icon = icons[sortType];
                    const type = types[sortType];

                    return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                    </a>`;
                },
            },
        },
    ),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${port}`);
});
