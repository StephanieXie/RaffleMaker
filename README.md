## Raffle Maker

Modified from this tutorial:  https://github.com/sslover/node-express-twilio-sms

### Setting up local development server

Make sure you have all of these installed on your machine:

* Node.js <http://nodejs.org/>
* Express.js: <http://expressjs.com/>
* Mongoose.js (for MongoDB): <http://mongoosejs.com/>
* ngrok (public URLs for building webhook integrations):  <https://ngrok.com/>

**How to set up ngrok for Twilio:  <https://www.twilio.com/docs/voice/client/tutorials/how-to-set-up-a-server-for-twilio-client#running-locally-using-ngrok>**

**Install nodemon to make life easier for you. `npm install -g nodemon`**

1) `git clone https://github.com/StephanieXie/RaffleMaker.git`

2) `cd path/to/RaffleMaker`

3) `npm install`

### Starting the server

4) `nodemon`

5) In a separate tab (but same directory): `ngrok http 3000`

6) Copy the forwarding address (will be something like https://8b57b7b3.ngrok.io) and go to <https://www.twilio.com/console/phone-numbers>

7) Click on your Twilio number, and at the bottom under "Messaging", paste the URL into the "A MESSAGE COMES IN" field.

**Webhook / [paste URL] / HTTP POST**

NOTE: since the ngrok URL is randomly generated, you will have to do steps 6 & 7 every time you quit ngrok in your terminal.**

8) Open the ngrok URL in your browser.

### More tutorials and helpful links

* <https://www.twilio.com/docs/sms/quickstart/node>
* <https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-node-js>
* <https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js>
