const express = require('express');
const router = express.Router();
const agencyAdminController = require('../controllers/agencyAdminController');

router.post('/', agencyAdminController.createAgencyAdmin);
router.get('/', agencyAdminController.getAllAgencyAdmins);
router.get('/:id', agencyAdminController.getAgencyAdminById);
router.put('/:id', agencyAdminController.updateAgencyAdmin);
router.delete('/:id', agencyAdminController.deleteAgencyAdmin);

module.exports = router;