const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const conn = require('./db/conn');
require('dotenv').config();

const app = express();
app.use(express.json());

// Models
const Comment = require('./models/Comment');
const User = require('./models/User');

// Import Routes
const commentsRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');

// Import Controller
const CommentController = require('./controllers/CommentController');


// Template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Express usar arquivos da pasta public
app.use(express.static('public'));

// receber resposta do body
app.use(express.urlencoded({
    extended: true
}));

// Configurando express-session
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            httpOnly: true,
        }

    })
);

// Flash message
app.use(flash());

// set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

// Routes
app.use('/comments', commentsRoutes);
app.use('/', authRoutes);
app.get('/', CommentController.showComments);

conn.sync().then(() => {
    app.listen(process.env.PORT || 3000);
}).catch((err) => {
    console.log(err);
})



