const router = require('express').router();
const controller = require('../controllers/products');

router.post('/', controller.createReminder);
router.get('/', controller.getAllReminders);
router.get('/:id', controller.getReminderById);
router.put('/:id', controller.updateReminderById);
router.patch('/:id', controller.updateReminderById);
router.delete('/:id', controller.updateReminderById);

module.exports = router;