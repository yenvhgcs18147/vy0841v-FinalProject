import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import sendMail from '../../../utils/sendMail'
import { createAccessToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
  switch(req.method){
      case "POST":
          await forgetPassword(req, res)
          break;
  }
}

const forgetPassword = async (req, res) => {
  try {
    const {email} = req.body

    const user = await Users.findOne({  email })
    if(!user) return res.status(400).json({err: 'The user do not exist'})

    const access_token = createAccessToken({id: user._id})
    
    const url = `${process.env.BASE_URL}/resetPassword/${access_token}`


    sendMail(email, url, "Reset your password")
    res.json({msg: "Re-send the password, please check your email"})


  } catch (err) {
    return res.status(500).json({err: err.message})
  }
      
   
}