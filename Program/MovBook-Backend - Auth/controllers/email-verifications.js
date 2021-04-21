// Importing 'emailVerificationModel' to query from the mongoDB database
const emailVerificationModel = require("../models/email-verifications");
// Importing 'loginModel' to query from the mongoDB database
const loginModel = require("../models/logins");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Function - Creating new email verification using route, 'BASE_URL/api/email-verifications/create'
exports.createNewEmailVerification = async (req, res, next) => {

  // Extracting the passed loginObjectId from the URL
  let passedLoginObjectId = req.body.loginObjectId;

  // Extracting the user entered email address from the URL
  let passedEmailAddress = req.body.enteredEmailAddress;

  // Using mongoose find() functionality to check the availability of the entered email address
  await loginModel.find({ 'email': passedEmailAddress }, (error, returnedData) => {
    if(error){
      res.status(500).json({
        message:
          "Unable to check email address availability",
      });
    }
    else{
      // Checking whether the returned data length is zero meaning the the passed email address
      // does not exist
      if(returnedData.length == 0){
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
            loginObjectId: passedLoginObjectId,
            pinCode: pinCode,
            generatedDateTimeServer: new Date()
          }).save().then((returnedData) => {
            res.status(200).json({
              message:
                "Email verification created",
              returnedData
            });
          }).catch((error) => {
            res.status(500).json({
              message: "Unable to create email verification"
            });
            console.log(error);
          })
          console.log("Email Address Verification Email Sent: ", { 
            emailVerificationEmailTemplateId, 
            dynamicTemplateData,
            passedEmailAddress });
          console.log('Email Response: ', emailResponse);

        })
        .catch((error) => {
          console.error("Error (send grid error): ", error.toString());
          res.status(500).json({
            message: "Unable to create email verification"
          });
          console.log(error);
        });
      }
      else{
        res.status(200).json({
          message:
            "Email Already Exists",
          returnedData
        });
      }
    }
  })
};

// Verifying the authentication pin code using route,
// 'BASE_URL/api/email-verifications/verify/:emailVerificationObjectId/:enteredVerificationPinCode'
exports.verifyEmailAddress = async (req, res, next) => {

  // Extracting emailVerificationObjectId from the request body
  let passedEmailVerificationObjectId = req.params.emailVerificationObjectId;

  // Extracting verificationPinCode from the request body
  let passedVerificationPinCode = req.params.enteredVerificationPinCode;

  await emailVerificationModel.findById(passedEmailVerificationObjectId).then((returnedData) => {
    // If condition - checking whether the length of the returned data is zero (no data is returned)
    // and the relevant message passed to the client-side
    if (returnedData.length == 0) {
      res.status(200).json({
        message:
          "No email verification available"
      });
    }
    else {
      // Defining date value using the verification create date time
      let verificationCreatedTime = new Date(returnedData.generatedDateTimeServer);

      // Retrieving the current date time
      let currentDateTime = new Date();

      // Generating the time difference from the verification created time and current time
      let verificationPeriod = new Date(currentDateTime.getTime() - verificationCreatedTime.getTime());

      // Extracting the number of hours in the 'verificationPeriod'
      let verificationPeriodHours = verificationPeriod.getUTCHours();

      // Extracting the number of minutes in the 'verificationPeriod'
      let verificationPeriodMinutes = verificationPeriod.getUTCMinutes();

      // Checking whether the 'verificationPeriod' has surpassed one hour
      // Verification Pin Code Validity Duration: 1 hour or 60 minutes
      if(verificationPeriodHours >= 1 && verificationPeriodMinutes >= 1){
        res.status(200).json({
          message:
            "Verification Pin Code Expired",
          returnedData
        });
      }
      else{
        // Defining the verification pin code from the database
        let verificationPinCodeDatabase = returnedData.pinCode;

        // Checking whether the passed verification pin code and pin code from the database is the equal
        if(passedVerificationPinCode == verificationPinCodeDatabase){
          res.status(200).json({
            message:
              "Email Address Verified",
            returnedData
          });
        }
        else{
          res.status(200).json({
            message:
              "Incorrect Verification Pin Code",
            returnedData
          });
        }
      }
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message:
        "Unable to verify pin code: ", error
    });
  });

};
