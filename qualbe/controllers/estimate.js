const cbAPI = require("./../api/cbAPIQualbe")
const tryCatch = require("./../utils/tryCatch");
 
const fetchEstimateForNewSubscription = tryCatch(async (req, res, next) => {
    let response;
    req = req.body;

    await cbAPI.fetchEstimateForNewSubscription(req.item_price_id, req.quantity, req.email ,req.line1, req.city, req.zip, req.country).then( res => {
        response = res;
    } )

    res.status(200).json(response);
});

module.exports = {
    fetchEstimateForNewSubscription
};