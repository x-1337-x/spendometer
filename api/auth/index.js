const router = require('express').Router();
const controller = require('./controller');

router.post('/register', controller.regUserValidation, controller.register);

router.post('/login', controller.loginUserValidation, controller.login);

module.exports = router;
