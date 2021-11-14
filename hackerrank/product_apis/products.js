const router = require('express').router();
const controller = require('../controllers/products');

router.post('/products', controller.create);
router.get('/products', controller.getAll);
router.get('/products/:id', controller.getById);
router.patch('/products/:id', controller.patchById);
router.put('/products/:id', controller.updateById);
router.delete('/products/:id', controller.updateById);

module.exports = router;