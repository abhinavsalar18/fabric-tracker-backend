import {FabricDetails} from "../models/fabricDetails.model.js"
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addData = asyncHandler ( async (req, res) => {
    const {fabricName, fabricQuantity, fabricImage, fabricCode} = req.body;
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

    res.status(201).json(
        new APIResponse(201, fabricData, "Fabric details added!")
    );
    
});


const getAllData = asyncHandler ( async (req, res) => {
    const fabricData = await FabricDetails.find();

    res.status(200).json(
        new APIResponse(200, fabricData, "all data fetched successfully!")
    )
});


const deleteData = asyncHandler ( async (req, res) => {
    const dataId = req.params?.id;
    
    const fabricData = await FabricDetails.findOne({_id: dataId});

    if(!fabricData){
        throw new APIError(404, "Data not found!");
    }

    const response = await FabricDetails.deleteOne({_id: dataId});
    console.log("Data deleted successfully!", response);
    res.status(200).json(
        new APIResponse(200, {data: fabricData, response: response}, "Data deleted successfully!")
    ); 
});

const updateData = asyncHandler ( async (req, res) => {
    const dataId = req.params?.id;
    const newData = req.body;
    // const {fabricName, fabricCode, fabricImage, fabricQuantity} = req.body;
    const filteredData = Object.keys(newData).reduce((acc, key) => {
        if (newData[key] !== undefined && newData[key] !== null && newData[key] !== "") {
          acc[key] = newData[key];
        }
        return acc;
      }, {});

    const fabricData = await FabricDetails.findOne({_id: dataId});
    if(!fabricData){
        throw new APIError(404, "Data not found!");
    }
    
    const response = await FabricDetails.findOneAndUpdate({_id: dataId},
        filteredData, 
        {new: true},
    );
    console.log("Data updated successfully!", response);
    res.status(200).json(
        new APIResponse(200, response, "Data updated successfully")
    );
});



export {addData, getAllData, deleteData, updateData};
