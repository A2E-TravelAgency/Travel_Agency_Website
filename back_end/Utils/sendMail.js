import nodemailer from 'nodemailer';
import {google} from 'googleapis';
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND ='https://developers.google.com/oauthplayground';


const MAILING_SERVICE_CLIENT_ID='1072327352534-ph7om41692i4va82qt6gbkg385cpprbl.apps.googleusercontent.com';
const MAILING_SERVICE_CLIENT_SECRET='5eBCfttgg7VLB3Liv3qXo0mE';
const MAILING_SERVICE_REFRESH_TOKEN='1//04blybSj_5XNrCgYIARAAGAQSNwF-L9IrEmja-ycpNNjUrVmy3AiIgl5SDMY08vnqSYWlrx1t3MkwEWZW3m5np_DTGkNKHRNrjbY';
const SENDER_EMAIL_ADDRESS ='sisomatrej@gmail.com';


const oauth2Client = new google.auth.OAuth2 (
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
); 
oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
})
export async function sendEmail (to, url, txt) {
   try {
       
  
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken : accessToken
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Reset Password",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">A2E Travel Agency</h2>
        <p>Hello! Forgot your password?
            Just click the button below to reset your password.
        </p>
        
        <a href=${url} style="background: black; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${url}</div>
        </div>
    `
    };
    const result = await transporter.sendMail(mailOptions);
    return result;

  /*  transporter.sendMail(mailOptions,  (err, info) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    });*/
    } catch (error) {
        return error;
    }
};

export default sendEmail;