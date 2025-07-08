const express = require('express');
const router = express.Router();
const controller = require('../controllers/recordController');
const auth = require('../middleware/authMiddleware');

router.get('/buscar', auth, controller.buscar);

module.exports = router;
