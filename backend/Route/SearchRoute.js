const express = require('express');
const router = express.Router();

const { searchController } = require('../Controller/Search');

router.post('/search-item', searchController);

module.exports = router;