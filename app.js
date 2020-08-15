require('dotenv').config()
const twilio = require('twilio')
const express = require('express')
const MessagingResponse = twilio.twiml.MessagingResponse
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({extended:false}))

var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

var twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.get('/message', (req, res) => {

    twilioClient.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: '+5511952340157',
        body: 'Olá Mundão'
    }).then(console.log).catch(console.error)
})

app.post('/call', function(req, res, next) {
    twilioClient.calls
    .create({
       url: 'http://demo.twilio.com/docs/voice.xml',
       to: '+5511952340157',
       from: TWILIO_PHONE_NUMBER
     })
    .then(call => console.log(call.sid));
  });

  app.post('/webhook', (req, res) => {
      const msg = req.body.Body
      const twiml = new MessagingResponse()
      twiml.message(`Obrigado por enviar essa mensagem ${msg}`)
      res.send(twiml.toString())
  })


  // Create a TwiML document to provide instructions for an outbound call
app.post('/hello', function(req, res, next) {
    // Create a TwiML generator
    var twiml = new twilio.twiml.VoiceResponse();
    // var twiml = new twilio.TwimlResponse();
    twiml.say('Hello there! You have successfully configured a web hook.');
    twiml.say('Good luck on your Twilio quest!', { 
        voice:'woman' 
    });
  
    // Return an XML response to this request
    res.set('Content-Type','text/xml');
    res.send(twiml.toString());
  });




const PORT = 3001

app.listen(PORT, () => {
    console.log(`HTTP server listening on http://localhost:${PORT}/`);
    console.log(`Paste this URL into the hack UI to complete the challenge!`);
    console.log(`You can open this URL in your web browser too to test it out.`);   
})