const tryCatch = require("../utils/tryCatch");
const xlsxFile = require('read-excel-file/node');


const fetchAllState = tryCatch(async (req, res, next) => {
    let result = {
        "state" : []
    };

    let rows = await  xlsxFile('./StateFieldList.xlsx')
    
    let state = [];

    for(var i=1;i<rows.length;i++) {
        state = [...state, {'text': rows[i][0], 'value': rows[i][1]}  ];
    }
    result = {state};
    
    //res.status(200).json(response);
    res.status(200).json(result);
});


module.exports = {
    fetchAllState
};