# Raffle Maker

### Verify your phone number with Twilio ###

Follow the instructions [here](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Outbound-Caller-ID-with-Twilio) to verify your phone number via the Twilio console.

---

### TO RUN

1. In your browser, go to `raffle-maker.herokuapp.com`.

2. Enter your number in the search bar and click 'Submit'. You should receive the following text:  **"Sent from your Twilio trial account - i want dominos"**

3. Text the Twilio number back. If the text goes through, you should get a response:  **"Sent from your Twilio trial account - Successfully saved status! --> your message"**

---

### FOR LOCAL DEVELOPMENT

```
NOTE:
    Twilio's servers require our app to be accessible via the internet, meaning we will need a public URL for building webhook integrations.
      - For prod, we are hosting our app on Heroku.
            - For testing, we are using ngrok.

    Twilio, Heroku, and ngrok require you to make an account, which we have already done for this app.

    All account information can be found in 'RaffleMaker/.static_info'.
```

**Setting up**

1. Install [Homebrew](https://treehouse.github.io/installation-guides/mac/homebrew) and [Node.js](https://treehouse.github.io/installation-guides/mac/node-mac.html).

  ```
  # Homebrew
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  # Node.js
  brew.update
  brew install node
  ```

2. Clone this repository and `cd` into it.

  ```
  git clone https://github.com/StephanieXie/RaffleMaker.git
  cd RaffleMaker
  ```

3. Install package dependencies.

  `npm install`

4. Install and configure [Heroku](https://toolbelt.heroku.com).

  ```
  # Install Heroku CLI
  brew install heroku/brew/heroku

  # Authenticate with the Heroku credentials'
  heroku login

  # Set up the existing Heroku app on local machine
  heroku git:remote -a raffle-maker

  # Configure Heroku for MongoDB
  heroku config --shell | grep MONGODB_URI >> .env
  ```

5. Update `.env` with Twilio credentials.

  Your `.env` should be formatted like the following:

  ```
  MONGODB_URI='<...>'

  TWILIO_ACCOUNT_SID='<...>'
  TWILIO_AUTH_TOKEN='<...>'
  TWILIO_NUMBER='<...>'
  ```

6. Install [ngrok](https://ngrok.com/).

  ```
  # Authenticate
  ./ngrok authtoken <AUTH_TOKEN>

  # Add path and alias in `~/.bash_profile`
  export PATH="/Users/<USER_NAME>/ngrok:${PATH}"
  alias ngrok="/Users/<USER_NAME>/ngrok"
  ```

7. Finally, install `nodemon` so you don't have to start your app every time you make a change.

  `npm install -g nodemon`

**Starting the server**

1. In 'RaffleMaker/', run `nodemon`

2. In a separate tab (but still in 'RaffleMaker'), run `ngrok http 3000`

3. Copy the forwarding address (will be something like https://8b57b7b3.ngrok.io) and go to <https://www.twilio.com/console/phone-numbers>

4. Click on your Twilio number, and at the bottom under 'Messaging', paste the URL into the 'A MESSAGE COMES IN' field.

    Webhook / `<NGROK_URL>` / HTTP POST

  ```
  NOTE:
      Since the ngrok URL is randomly generated, you will have to do steps 3 & 4 every time you quit ngrok in your terminal. So try not to quit.
  ```

5. Open the ngrok URL in your browser.

---

### Resources

**Twilio Tutorials**

* [PROGRAMMABLE SMS QUICKSTART FOR NODE.JS](https://www.twilio.com/docs/sms/quickstart/node)
* [SMS AND MMS NOTIFICATIONS WITH NODE.JS AND EXPRESS](https://www.twilio.com/docs/sms/tutorials/server-notifications-node-express)
* [RECEIVE AND REPLY TO SMS AND MMS MESSAGES IN NODE.JS](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)
* [SETTING UP A SERVER FOR TWILIO CLIENT WITH NGROK](https://www.twilio.com/docs/voice/client/tutorials/how-to-set-up-a-server-for-twilio-client#running-locally-using-ngrok)
* [CREATE AN SMS CONVERSATION IN NODE.JS](https://www.twilio.com/docs/sms/tutorials/how-to-create-sms-conversations-node-js)
* [Node.js / Express.js / MongoDb (+Mongoose) Boilerplate](https://github.com/sslover/node-express-twilio-sms)

**Misc.**

* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [StackEdit (Markdown renderer)](https://stackedit.io)
* [Fixing npm On Mac OS X for Homebrew Users](https://gist.github.com/DanHerbert/9520689#gistcomment-1473994)
