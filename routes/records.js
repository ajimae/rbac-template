const { Router } = require('express');
const router = Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const RecordController = require('../controllers/recordsController');
const recordController = new RecordController()

// Protect the routes with RBAC middleware
router.get('/records', rbacMiddleware.checkPermission('read_record'), recordController.getAllRecord);
router.post('/records', rbacMiddleware.checkPermission('create_record'), recordController.createRecord);
router.put('/records/:id', rbacMiddleware.checkPermission('update_record'), recordController.updateRecord);
router.delete('/records/:id', rbacMiddleware.checkPermission('delete_record'), recordController.deleteRecord);

module.exports = router;
