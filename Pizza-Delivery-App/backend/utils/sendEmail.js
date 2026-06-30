const axios = require("axios");

const sendEmail = async (to, subject, html) => {

  try {

    const response = await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "PizzaHub 🍕",

          email: process.env.EMAIL_USER,

        },

        to: [

          {

            email: to,

          },

        ],

        subject,

        htmlContent: html,

      },

      {

        headers: {

          accept: "application/json",

          "api-key": process.env.BREVO_API_KEY,

          "content-type": "application/json",

        },

      }

    );

    console.log("✅ Email Sent Successfully");

    console.log(response.data);

  } catch (error) {

    console.log("❌ Brevo Error");

    console.log(

      error.response?.data || error.message

    );

  }

};

module.exports = sendEmail;