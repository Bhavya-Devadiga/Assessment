const { UserDep } = require('../models');
const moment = require('moment');

exports.getAllData = async (req, res) => {
  try {
    const data = await UserDep.findAll({
      order : [[
        'id', 'ASC'
       ]]  
      }).then(userobj=>{
        res.json(userobj.map(c =>({
         id:c.id,
         firstName:c.firstName,
         lastName : c.lastName,
         email:c.email,
         gender:c.gender,
         dob:moment(c.dob).format("DD-MM-YYYY")  ,
         country:c.country,
         state:c.state,
         pincode:c.pincode
        })))
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.createData = async (req, res) => {
  const {firstName,lastName,email,gender,dob,country,state,pincode } = req.body;
  try {
    const newData = await UserDep.create({firstName,lastName,email,gender,dob,country,state,pincode });
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await UserDep.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    await data.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
exports.getpatchData = async (req, res) => {
  try {
    const data = await UserDep.findAll({
     where : {
      id : req.params.id
     }
 
     }).then(userobj=>{
       res.json(userobj.map(c =>({
        id:c.id,
        firstName:c.firstName,
        lastName : c.lastName,
        email:c.email,
        gender:c.gender,
        dob:moment(c.dob).format("YYYY-MM-DD")  ,
        country:c.country,
        state:c.state,
        pincode:c.pincode
       })))
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.updateData = async (req, res) => {
  const { id } = req.params;
  const {firstName,lastName,email,gender,dob,country,state,pincode } = req.body;
  try {
    const data = await UserDep.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    data.firstName = firstName;
    data.lastName = lastName;
    data.email = email;
    data.gender = gender;
    data.dob = dob;
    data.country = country;
    data.state = state;
    data.pincode = pincode;
    await data.save();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};