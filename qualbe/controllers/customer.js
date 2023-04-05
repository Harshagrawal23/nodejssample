const cbAPI = require("./../api/cbAPIQualbe")
const tryCatch = require("./../utils/tryCatch");

const fetchCustomerByPhone = tryCatch(async (req, res, next) => {
    const phone = req.params.phone;
    console.log(phone)
    let response = null; 

    let result = await cbAPI.fetchCustomerByPhone(phone);

    for(var i = 0; i < result.list.length;i++){
        var entry=result.list[i]
        var customer = entry.customer;
        var card = entry.card;
        response = customer;    
    }

    //res.status(200).json(response);
    res.status(200).json(result.list.length>0 ? true: false);
});


module.exports = {
    fetchCustomerByPhone
};