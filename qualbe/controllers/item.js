const cbAPI = require("../api/cbAPIQualbe")
const tryCatch = require("../utils/tryCatch");

const fetchItem = tryCatch(async (req, res, next) => {
    const item_id = req.params.item_id;

    let result = await cbAPI.fetchItem(item_id);

    //res.status(200).json(response);
    res.status(200).json(result);
});


module.exports = {
    fetchItem
};