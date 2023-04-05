const tryCatch = (Controller) => async (req,res,next) => {
    try{
        await Controller(req,res)
    } catch(error){
        return next(error);
    }
};

module.exports = tryCatch;