const twilio = require('twilio')
require('dotenv').config()



const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

twilioClient.messages.create({
    from: '+13342747580',
    to: '+5511952340157',
    body: 'First Message, DevZuno!'
}).then(console.log).catch(console.error);