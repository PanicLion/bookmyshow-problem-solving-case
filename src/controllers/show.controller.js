const getShowsByCinemaId = require('../services/show.services');


const shows = async (req, res) => {
    const cinemaId = req.params['cinemaId'];
    const date = req.params['date'];
    try{
        let shows = await getShowsByCinemaId(cinemaId, date);
        if (shows.length === 0) {
            return res.status(404).send({
                message: "Show not found for selected date."
            });
        }
        return res.status(200).send(shows);
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
}

module.exports = shows;
