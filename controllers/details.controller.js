import {FabricDetails} from "../models/fabricDetails.model.js"
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addData = asyncHandler ( async (req, res) => {
    console.log(req.body);
    const {fabricName, fabricQuantity, fabricImage, fabricCode} = req.body;

    // try{
        
    // }
    // catch(err){
    //     console.log(err);
    // }
    if( !fabricImage || !fabricName || !fabricQuantity || !fabricCode){
        throw new APIError(400, "All fields are required!");
    }
    
    const isFabricExists = await FabricDetails.findOne({fabricName: fabricName});
    if(isFabricExists){
        throw new APIError(400, "Fabric already exists!");
    }

    const fabricData = await FabricDetails.create({
        fabricName,
        fabricQuantity,
        fabricCode,
        fabricImage
    });

    console.log("New data added: ",fabricData);
    res.status(201).json(
        new APIResponse(201, fabricData, "Fabric details added!")
    );
    
});


const getAllData = asyncHandler ( async (req, res) => {
    const fabricData = await FabricDetails.find();
    console.log("All data: ", fabricData);

    res.status(200).json(
        new APIResponse(200, fabricData, "all data fetched successfully!")
    )
});

export {addData, getAllData};
