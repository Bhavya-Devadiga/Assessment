const express = require('express');
const router = express.Router();
const UserDepController = require('../controllers/userDependentcontroller');
const countryController = require('../controllers/countrycontroller');
const stateController = require('../controllers/statecontroller');


router.get('/', UserDepController.getAllData);
router.get('/getcountry', countryController.getCountryData);
router.get('/getallstate', stateController.getAllState);
router.get('/getstate/:id', stateController.getstateData);
router.post('/createdata', UserDepController.createData);
router.delete('/deletedata/:id', UserDepController.deleteData);
router.get('/patchdata/:id', UserDepController.getpatchData);
router.put('/:id', UserDepController.updateData);


module.exports = router;