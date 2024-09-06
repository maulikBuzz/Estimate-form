var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
const path = require('path');


module.exports = {
    contactUsSendmail: async function (user) {
        const reqObj = {
            email: user.email,
            message: user.message,
            subject: user.subject,
            username: user.name,
            context: { name: user.name },
            template: "contact-us",
        };
        const url = path.resolve(__dirname, '../../email-templates/contactUs.html')
        await sendMail(reqObj, url, false)

    },
    contactUsAdmin: async function (user) {
        const reqObj = {
            email: "maulik.buzz@gmail.com",
            subject: user.subject,
            template: "contact-us",
            context: { 'name': user.context.name, 'contact_no': user.context.contact_no, 'email': user.context.email, 'message': user.context.message },
            template: 'admin-contact-us'
        };
        const url = path.resolve(__dirname, '../../email-templates/contactUsAdmin.html')
        await sendMail(reqObj, url, false)
    },

}

async function sendMail(reqObj, url) {
    try {
        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
                if (err) {
                    callback(err);
                    throw err;
                } else {
                    callback(null, html);
                }
            });
        };

        let smtpTransportData = nodemailer.createTransport(
            smtpTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: "maulik.buzz@gmail.com",
                    pass: "qmwbcxtgaykskksi",
                },
                tls: {
                    rejectUnauthorized: false, // Disable certificate verification
                },
            })
        );
        readHTMLFile(url, function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                reqObj,
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: {
                    name: "maulik.buzz@gmail.com",
                    address: "maulik.buzz@gmail.com",
                },
                to: reqObj.email,
                subject: reqObj.subject,
                html: htmlToSend,
            };
            smtpTransportData.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error); 
                    return error;
                } else {
                    console.log("working");
                    return response;
                }
            });
        });

    } catch (e) {
        console.log(e);
    }
}
