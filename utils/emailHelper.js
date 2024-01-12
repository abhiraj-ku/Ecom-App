const nodemailer =require("nodemailer")

const sendEmail= async(options)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
       
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
          pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
        },
      });
    const message={
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: options.mails, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
}

    
      
        // send mail with defined transport object
    await transporter.sendMail(message);

}


module.exports = sendEmail