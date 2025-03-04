require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const passport=require('passport');
const session=require('express-session');
const GoogleStrategy=require('passport-google-oauth20').Strategy;

const app=express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/filmovi';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
const connection=mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB konekcija uspostavljena');
});

app.use(express.json());
app.use(cors());
app.use(session({ secret: 'tajna', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));

passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.json({ message: 'OAuth autentifikacija uspješna!', user: req.user });
    });

const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Film API",
            version: "1.0.0",
            description: "Dokumentacija za filmoteku",
        },
        servers: [
            {
                url: BASE_URL,
                description: "Lokalni poslužitelj"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

require('./models/actor');
require('./models/address');
require('./models/category');
require('./models/city');
require('./models/country');
require('./models/customer');
require('./models/film_text');
require('./models/film');
require('./models/filmActor');
require('./models/filmCategory');
require('./models/inventory');
require('./models/language');
require('./models/payment');
require('./models/rental');
require('./models/staff');
require('./models/store');

const actorsRouter=require('./routes/actors');
const addressesRouter=require('./routes/addresses');
const categoriesRouter=require('./routes/categories');
const citiesRouter=require('./routes/cities');
const countriesRouter=require('./routes/countries');
const customersRouter=require('./routes/customers');
const filmsTextsRouter=require('./routes/films_texts');
const filmsRouter=require('./routes/films');
const filmsActorsRouter=require('./routes/filmsActors');
const filmsCategoriesRouter=require('./routes/filmsCategories');
const inventoriesRouter=require('./routes/inventories');
const languagesRouter=require('./routes/languages');
const paymentsRouter=require('./routes/payments');
const rentalsRouter=require('./routes/rentals');
const staffsRouter=require('./routes/staffs');
const storesRouter=require('./routes/stores');
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/glumci',actorsRouter);
app.use('/adrese',addressesRouter);
app.use('/kategorije',categoriesRouter);
app.use('/gradovi',citiesRouter);
app.use('/drzave',countriesRouter);
app.use('/kupci',customersRouter);
app.use('/opisfilma',filmsTextsRouter);
app.use('/filmovi',filmsRouter);
app.use('/glavniglumci',filmsActorsRouter);
app.use('/zanrovi',filmsCategoriesRouter);
app.use('/skladiste',inventoriesRouter);
app.use('/jezici',languagesRouter);
app.use('/placanja',paymentsRouter);
app.use('/iznajmljivanja',rentalsRouter);
app.use('/osoblje',staffsRouter);
app.use('/trgovine',storesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/auth/fake', (req, res) => {
    const fakeUser = {
        id: "12345",
        name: "Testni Korisnik",
        email: "test@example.com"
    };
    res.json({ message: "OAuth autentifikacija uspješna!", user: fakeUser });
});


app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});