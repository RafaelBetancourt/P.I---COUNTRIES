const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/countries', async (req, res) => { //endpoints of APIs

    const { name, continent, nameOrder, popuOrder } = req.query;
    let allCountries = await Country.findAll();
    if (nameOrder) {
        let search = await Country.findAll({
            order: [
                ["name", nameOrder]
            ]
        });
        return search.length > 0 ? res.status(201).json(search) : res.status(201).send('Could not order by name ');
    } else if (popuOrder) {
        let search = await Country.findAll({
            order: [
                ["population", popuOrder]
            ]
        });
        return search.length > 0 ? res.status(201).json(search) : res.status(201).send('Could not order by population ');
    } else if (continent) {
        let search = await Country.findAll({
            where: {
                continent: {
                    [Op.startsWith]: continent.toUpperCase()
                }
            }
        });
        return search.length > 0 ? res.status(201).json(search) : res.status(201).send('Name does not belong to any continent');
    } else if (name) {
        let search = await Country.findAll({
            where: {
                name: {
                    [Op.startsWith]: name.toUpperCase()
                }
            }
        });
        return search.length > 0 ? res.status(201).json(search) : res.status(201).send([]);
    }
    else {
        return res.status(201).json(allCountries)
    }
});

router.get('/countries/:id', async (req, res) => {
    const { id } = req.params;
    const found = await Country.findByPk(id.toUpperCase(), {
        include: Activity
    })
    if (found) {
        res.status(201).json(found);
    } else {
        //console.log(id);
        return res.status(201).json({ error: 'Invalid ID' })
    }
});

router.get('/activities', async function (req, res) {
    try {
        let search = await Activity.findAll({include: Country})
        res.json(search)
    } catch (error) {
        res.json({ err: error })
    }
});

router.post('/countries/activities', async function (req, res) {

    let { name, difficulty, duration, season, country } = req.body;
    //console.log(req.body);
    try {
      
        let activityCreated = await Activity.create({
            name,
            difficulty,
            duration,
            season,        
        });

        await activityCreated.addCountry(country); //insert the activity in the relation table
        res.status(200).json(activityCreated)
  
    } catch (error) {
        //console.log(error);
        return res.status(400).send('Please add all options')
    }
});

module.exports = router;
