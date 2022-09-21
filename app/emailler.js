const nodemailer = require('nodemailer')


const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7377a313cb7201",
          pass: "01ae33beea91a8"
    }
})
return transport;
}

const sendMail = async (user) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: 'mauro.sz48@gmail.com',
        to: `${user.email}`,
        subject:`Hola  ${user.name}, Bienvenido estas registrado`,
        html: `${user}`
    })
    console.log("correo enviado", info.messageId);

    return
}




exports.sendMail = (user) => sendMail(user)
