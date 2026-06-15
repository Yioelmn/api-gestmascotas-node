import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "SanosYSalvos.duocuc@gmail.com",
        pass: "edjesiwisorlwxdh" // Ojo: Idealmente usa variables de entorno (.env) más adelante
    }
});

// Función para enviar correos de manera asíncrona
export const enviarCorreo = async (to, subject, htmlContent) => {
    try {
        let mailOptions = {
            from: '"Sanos y Salvos" <SanosYSalvos.duocuc@gmail.com>',
            to: to,
            subject: subject,
            html: htmlContent
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Correo enviado exitosamente: ", info.messageId);
    } catch (error) {
        console.error("Error al enviar el correo: ", error);
    }
};