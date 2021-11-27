const nodemailer = require('nodemailer')
const {google} = require('googleapis')  

const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const oauth2Client = new OAuth2(
    process.env.MAILING_SERVICE_CLIENT_ID,
    process.env.MAILING_SERVICE_CLIENT_SECRET,
    process.env.MAILING_SERVICE_REFRESH_TOKEN,
    process.env.OAUTH_PLAYGROUND
)

const SendEmail = (to, url, txt) => {

    oauth2Client.setCredentials({
        refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'OAuth2',
            user: process.env.SENDER_EMAIL_ADDRESS,
            clientId: process.env.MAILING_SERVICE_CLIENT_ID,
            clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Chocolate Shop",

        html: 
        `

            <div style="max-width: 700px; margin:auto; border: 1px solid #ddd; padding: 20px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: #FF9AA2;">Welcome to the Chocolate Shop.</h2>
                <p style="color: black">
                    Just click the button below to regenerate your password.
                </p>

                <a href= "${url}" style="background: #343a40; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: inline-block;">${txt}</a>

                <p style="color: black">
                    If the button doesn't work for any reason, you can also click on the link below:
                </p>
            
                <div>${url}</div>
            </div>
            `
        
        
    }

    smtpTransport.sendMail(mailOptions,  (err, infor) => {
        if(err) return err;
        return infor
        
    })
}

export default SendEmail