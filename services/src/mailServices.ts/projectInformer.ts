import mssql from 'mssql'
import dotenv from 'dotenv'
import ejs from 'ejs'
import { sqlConfig } from '../config/sqlConfig'
import { sendMail } from '../helpers/email.helpers'

export const informProject = async () => {
    const pool = await mssql.connect(sqlConfig);


    const Projects = (await pool.request().query('SELECT * FROM Projects WHERE isInformed = 0')).recordset

    console.log("Informing...", Projects);
    
    for (let project of Projects) {
        ejs.renderFile('templates/informUser.ejs', { projectName: project.project_name, projectDescription: project.project_description, endDate: project.end_date, asignee: project.asignee_name  }, async (error, data) => {
            let mailOptions = {
                from: "kennynet66@gmail.com",
                to: project.asignee_email,
                subject: "You have been assigned a project",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Projects SET isInformed = 1 WHERE isInformed = 0')

                console.log("Emails sent to new users");

            } catch (error) {
                console.log(error);

            }
        })
    }
}
