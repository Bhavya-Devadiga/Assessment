const { state } = require('../models');

exports.getstateData = async (req, res) => {
  try {
    const data = await state.findAll({
     where : {
      countryId : req.params.id
     }
 
     }).then(stateobj=>{
       res.json(stateobj.map(c =>({
         id:c.stateId,
         name:c.stateName,
         countryid :c.countryId
       })))
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createData = async (req, res) => {
  const {stateId,countryId,stateName } = req.body;

  try {
    const newData = await state.create({stateId,countryId,stateName });
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllState = async (req, res) => {
  try {
    const obj={}
    const data = await state.findAll({
      order : [[
        'stateId', 'ASC'
       ]]
 
     }).then(stateobj=>{
       res.json(stateobj.map(c =>(
        {
         id:c.stateId,
         name:c.stateName,
         countryid :c.countryId
       }
       )))
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
