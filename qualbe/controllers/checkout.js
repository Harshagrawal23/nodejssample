const tryCatch = require("../utils/tryCatch");
const cbAPI = require("../api/cbAPIQualbe")
const url = require('url');
const dotenv = require('dotenv');
dotenv.config();

const siteName = process.env.CB_SITE;
const defaultItemPriceId = "QBLSZXEM-annual";

const renderCheckout = tryCatch(async (req, res) => {
    const query = url.parse(req.url, true).query;
    const itemPriceId = req.params.itemPriceId;
    console.log(itemPriceId)
    var itemPrice;    
    try {
        itemPrice= await cbAPI.fetchItemPrice(itemPriceId);
    } catch(err) {
        itemPrice= await cbAPI.fetchItemPrice(defaultItemPriceId)
    }

    res.render('CheckOutPage.ejs',  {itemPriceId: itemPrice.item_price.id, itemId: itemPrice.item_price.item_id,siteName, isr: query.affid });
});

module.exports = {
    renderCheckout
};