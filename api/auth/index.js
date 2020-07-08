const router = require('express').Router();
const controller = require('./controller');

router.post('/register', controller.regUserValidation, controller.register);

module.exports = router;
