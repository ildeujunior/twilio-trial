const twilio = require('twilio')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MessagingResponse = twilio.twiml.MessagingResponse

app.use(bodyParser.urlencoded({extended:false}))

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

app.get('/', (req, res) => {

    twilioClient.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5511952340157',
        body: 'Your appointment is coming up on Jan 30 at 11h'
    }).then(console.log).catch(console.error)
})

app.post('/webhook', (req, res) => {
    const msg = req.body.Body;
    const twiml = new MessagingResponse();
    twiml.message(`Obrigado por enviar a mensagem ${msg}`);
    res.send(twiml.toString())
})

app.listen(3000, () => console.log('Application running on 3000'))