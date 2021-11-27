import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'
import { google } from 'googleapis'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await googleLogin(req, res)
            break;
    }
}

const {OAuth2} = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const googleLogin = async(req, res) => {
    try {
        const {tokenId} = req.body

        const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
        
        const {email, name, picture} = verify.payload

        const password = email + process.env.GOOGLE_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await Users.findOne({email})

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            
            res.json({
                refresh_token,
                access_token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    root: user.root
                }
            })

        }else{
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture
            })

            await newUser.save()

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            
            res.json({
                refresh_token,
                access_token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    root: user.root
                }
            })
        }

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}