const router = require("express").Router();
const nearByOutletRoutes = require('./NearByOutletRoute');

module.exports = () => {

    //Setting Up User Routes
    router.use('/nearby-outlet', nearByOutletRoutes());
    
    return router;
};