const router = require("express").Router();
const { NearByOutletController } = require("../controllers");

module.exports = () => {
    
    router
        .route('/:address')
        .get(NearByOutletController.getNearByOutlet);
    
    return router;
};