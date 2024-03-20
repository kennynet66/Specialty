import nodemailer from 'nodemailer';

import { mailConfig } from '../interfaces/mail_config';
import dotenv from 'dotenv';
dotenv.config();


function createTransporter(config: mailConfig){
    let transporter = nodemailer.createTransport(config)

    return transporter
}

let configurations: mailConfig = ({
    // service: 'gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    requireTLS:true,
    auth: {
        user: process.env.E_USER as string,
        pass: process.env.E_PASS as string
    }
})

export const sendMail = async(messageOption: any)=>{
    const transporter = await createTransporter(configurations)

    await transporter.verify()

    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info.response);
        }
    })
}