const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/enterpriseController');
const { authenticate, authorize } = require('../middlewares/auth');

// Toutes les routes sont protégées SuperAdmin
router.use(authenticate, authorize('superadmin'));

router.get('/', enterpriseController.getAllEnterprises);
router.post('/', enterpriseController.createEnterprise);
router.put('/:id', enterpriseController.updateEnterprise);
router.patch('/:id/activate', enterpriseController.activateEnterprise);
router.patch('/:id/deactivate', enterpriseController.deactivateEnterprise);

module.exports = router;

