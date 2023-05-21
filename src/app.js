const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, connectToDB } = require('./connections/mysql.connection');
const cities = require('./controllers/city.controller');
const cinemaRouter = require('./routes/cinemas.routes');
const showsRouter = require('./routes/shows.routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    res.json({
        cities: await cities()
    });
})

app.use('/city', cinemaRouter);

app.use('/shows', showsRouter);

PORT = 3000;

app.listen(process.env.PORT || PORT, async (err) => {
    if (!err) {
        console.log(`Server is running and listening to PORT: ${PORT}`);
        await connectToDB();
    }
});
