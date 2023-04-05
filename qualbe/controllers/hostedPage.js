const cbAPI = require("../api/cbAPIQualbe")
const tryCatch = require("../utils/tryCatch");
 
const createCheckoutForNewSubscription = tryCatch(async (req, res, next) => {
    let response;
    req = req.body;
    
    await cbAPI.createCheckoutForNewSubscription(req.item_price_id, req.quantity, req.first_name, req.last_name ,req.email, req.phone, req.line1, req.line2 ,req.city, req.zip, req.state, req.country, req.bline1, req.bline2 ,req.bcity, req.bzip, req.bstate ,req.dependent_members, req.isr).then( res => {
        response = res;
    } )

    res.status(201).json(response);
});

const retrieveHostedPage = tryCatch(async (req, res, next) => {
    const hostedPageId = req.params.id;
    let response = await cbAPI.retrieveHostedPage(hostedPageId);

    res.status(201).json(response);
} )

module.exports = {
    createCheckoutForNewSubscription,
    retrieveHostedPage
};