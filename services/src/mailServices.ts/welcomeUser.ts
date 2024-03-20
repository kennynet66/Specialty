import mssql from 'mssql'
import dotenv from 'dotenv'
import ejs from 'ejs'
import { sqlConfig } from '../config/sqlConfig'
import { sendMail } from '../helpers/email.helpers'
dotenv.config();

export const welcomeuser = async () => {
    const pool = await mssql.connect(sqlConfig);

    const users = (await pool.request().query('SELECT * FROM Users WHERE isWelcomed = 0')).recordset

    console.log(users);
    
    for (let user of users) {
        ejs.renderFile('templates/welcomeUser.ejs', { CustomerName: user.fullName, customerId:user.userId }, async (error, data) => {
            let mailOptions = {
                from: process.env.E_USER,
                to: user.email,
                subject: "Welcome to Specialty",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0')

                console.log("Emails sent to new users");

            } catch (error) {
                console.log(error);

            }
        })
    }
}
