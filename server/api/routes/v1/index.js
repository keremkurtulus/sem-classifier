const express = require('express');
const imageRoute = require('./image.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/images',
    route: imageRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;
