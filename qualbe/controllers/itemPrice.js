const cbAPI = require("../api/cbAPIQualbe")
const tryCatch = require("../utils/tryCatch");

const fetchItemPrice = tryCatch(async (req, res, next) => {
    const item_price_id = req.params.item_price_id;
     console.log(item_price_id)
    let response = null; 

    let result = await cbAPI.fetchItemPrice(item_price_id);

    //res.status(200).json(response);
    res.status(200).json(result);
});


module.exports = {
    fetchItemPrice
};