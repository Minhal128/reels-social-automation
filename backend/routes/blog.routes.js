const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authenticate } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permission');

router.get('/', blogController.getAll);
router.get('/dashboard', blogController.getBlogDashboardData);
router.get('/slug/:slug', blogController.getBySlug);
router.get('/:id', blogController.getById);

router.use(authenticate);
router.post('/bulk-delete', checkPermission('delete.blogs'), blogController.bulkDelete);
router.post('/bulk-publish', checkPermission('update.blogs'), blogController.bulkPublish);
router.post('/bulk-schedule', checkPermission('update.blogs'), blogController.bulkSchedule);
router.post('/bulk-archive', checkPermission('update.blogs'), blogController.bulkArchive);
router.post('/bulk-unarchive', checkPermission('update.blogs'), blogController.bulkUnarchive);
router.post('/bulk-assign-tags', checkPermission('update.blogs'), blogController.bulkAssignTags);
router.post('/', checkPermission('create.blogs'), blogController.create);
router.put('/:id', checkPermission('update.blogs'), blogController.update);
router.delete('/:id', checkPermission('delete.blogs'), blogController.delete);

module.exports = router;
