// Importing model to query from the mongoDB database
const emailVerificationModel = require("../models/email-verifications");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Function - Creating new email verification, 'BASE_URL/api/email-verifications/create'
exports.createNewEmailVerification = async (req, res, next) => {

  // Extracting the user entered email address from the URL
  let passedEmailAddress = req.body.emailAddress;

  // Generating random number with six character length
  let pinCode = Math.random().toString().substr(2, 6);

  // Defining email template ID
  let emailVerificationEmailTemplateId = "d-1a52c7bb49924754877c2ff5ba3bd927";

  // Defining dynamic values for the email template
  let dynamicTemplateData = {
    verificationPinCode: pinCode
  };

  // Email configuration to send a valid email
  const emailConfigurations = {
    to: passedEmailAddress,
    from: { 
      name: "MovBook Team", 
      email: "movbook.team@gmail.com" 
    },
    templateId: emailVerificationEmailTemplateId,
    dynamic_template_data: dynamicTemplateData
  };

  // Sending new email through Send Grid
  sgMail.send(emailConfigurations).then((emailResponse) => {

    // Creating a new document to store the email verification details
    emailVerificationModel({
      loginObjectId: req.body.loginObjectId,
      pinCode: req.body.pinCode,
      generatedDateTime: req.body.generatedDateTime
    }).save().then((returnedData) => {
      res.status(200).json({
        message:
          "Email verification created",
        returnedData
      });
    }).catch((error) => {
      res.status(500).json({
        message: error
      });
      console.log(error);
    })
    console.log("Email Address Verification Email Sent: ", { emailVerificationEmailTemplateId, dynamicTemplateData });
    console.log('Email Response: ', emailResponse);

  })
  .catch((error) => {
    console.error("Error (send grid error): ", error.toString());
    res.status(500).json({
      message: error
    });
    console.log(error);
  });
  
};
