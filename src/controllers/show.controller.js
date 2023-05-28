const getShowsByCinemaId = require('../services/show.services').getShowsByCinemaId;
const { getByKey, setByKeyValue, setExpiryByKey } = require('../services/redis_cache.services');


const shows = async (req, res) => {
    const cinemaId = req.params['cinemaId'];
    const date = req.params['date'];
    const key = `Cinema_${cinemaId}_${date}`;
    try{
        const cacheResult = await getByKey(key);
        
        if (cacheResult) {
            console.log("Getting result from cache...");
            return res.status(200).send(JSON.parse(cacheResult));
        }

        console.log("Getting result from db...");
        let shows = await getShowsByCinemaId(cinemaId, date);
        if (shows.length === 0) {
            return res.status(404).send({
                message: "Show not found for selected date."
            });
        }
        await setByKeyValue(key, JSON.stringify(shows));
        await setExpiryByKey(key, process.env.SHOWS_BY_DATE_EXPIRY);

        return res.status(200).send(shows);
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
}

module.exports = shows;
