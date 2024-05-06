const Contact = require("../models/contact-model")

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        console.log(response, "response");
        return res.status(200).json({ message: "message sent successfully" })
    } catch (error) {
        return res.status(500).json({ messgae: "message not delievered" })
    }
}
module.exports = contactForm;