import mongoose from "mongoose"

const fabricDetailsSchema = new mongoose.Schema(
    {
        fabricName: {
            type: String,
            required: true,
        },
        
        fabricQuantity: {
            type: Number,
            default: 0,
            required: true

        },

        fabricImage: {
            type: String,
            required: true
        },
        fabricCode: {
            type: String,
            required: true
        }
    }, 
    
    {
        strict: false
    },
    
    {
        timestamps: true
    }
);

export const FabricDetails = mongoose.model("FabricDetails", fabricDetailsSchema);

