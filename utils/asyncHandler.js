const asyncHandler = (requestHandler) => {
    return async (req, res, next) => { // we have use return otherwise remove {} like in last example above
         try{
             await requestHandler(req, res, next);
         } catch (error){
             res.status(error.code || 404).json({
                 status: false,
                 message: error.message
             });
         }
     }
 }
 
 export default asyncHandler;