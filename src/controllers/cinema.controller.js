const getCinemasByCityId = require('../services/cinema.services');


const cinemas = async (req, res) => {
    try {
        let cinemas = await getCinemasByCityId(req.params['cityId']);
    
        for (let cinema of cinemas) {
            cinema.dataValues.shows = `http://localhost:3000/shows/${req.params['cityId']}/${cinema.dataValues.id}`
        }
        return res.status(200).json(cinemas);
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
};


module.exports = cinemas;
