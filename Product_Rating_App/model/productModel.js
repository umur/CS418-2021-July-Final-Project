const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    { productName:{ type:String,
                    required:[true,'please add a name'],
                unique:true,
                },
      productNumber:Number,
      productreview:{type:String,required:[true,`please select 'bad','good' or 'excellent'`]} ,
      userid:{ type: Number , required:true },
      username:{type:String,required:[true,'please add user name']}    
    

    }
)

module.exports = mongoose.model("ProductModel",productSchema)