const { country } = require('../models');

exports.getCountryData = async (req, res) => {
  try {
    const data = await country.findAll({
     order : [[
      'countryId', 'ASC'
     ]]

    }).then(countryobj=>{
      res.json(countryobj.map(c =>({
        id:c.countryId,
        name:c.countryName
      })))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.createData = async (req, res) => {
  const {countryId,countryName } = req.body;

  try {
    const newData = await country.create({countryId,countryName });
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
