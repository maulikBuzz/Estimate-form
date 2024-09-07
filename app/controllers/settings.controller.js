const { Setting } = require('../models/index')
const { contactUsSendmail, contactUsAdmin } = require("../helper/common_function");

const contactUs = async (req, res) => {
    try {
        const { name, contact_no, email, message } = req.body

        var insert_data = {
            name,
            contact_no,
            email,
            message,
            status: 1,
        };

        const addData = await Setting.insertContactUSData(insert_data);
        if (!addData.status) return res.status(400).send({ status: false, message: addData.message });

        var sendMailData = {
            subject: "Thanks for contacting Estimate",
            email,
            username: name,
            context: { name: name },
            template: "contact-us",
        };
        await contactUsSendmail(sendMailData);

        var sendAdminMailData = {
            subject: "User contacting to Estimate",
            context: insert_data,
        };
        await contactUsAdmin(sendAdminMailData)

        return res.status(200).send({ status: true, message: "Thank you for your message! We will be in touch with you shortly." });
    } catch (Err) {
        console.log(Err);
        return res.status(400).send({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}

module.exports = {
    contactUs
}
