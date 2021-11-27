import connectDB from '../../../../utils/connectDB'
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await cancleOrder(req, res)
            break;
    }
}

const cancleOrder = async(req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: 'Authentication is not valid.'})
        const {id} = req.query

        const order = await Orders.findOne({_id: id})
        if(order.delivered){
            await Orders.findOneAndUpdate({_id: id}, {paid: true})
    
            res.status(400).json({err: 'This order cannot cancle'})
        }else{
            await Orders.findOneAndUpdate({_id: id}, {
                paid: false,
                delivered: false, 
                cancle: true
            })
    
            res.json({
                msg: 'Updated success!',
                result: {
                    paid: false, 
                    delivered: false,
                    cancle: true
                }
            })
        }
        
    } catch {
        return res.status(500).json({err: err.message})
    }
}
