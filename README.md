# Raffle Maker

### TO RUN

1. Have participants text **CSC220** to RaffleMaker's phone number, **(619) 304-0737**.

2. In your browser, go to `raffle-maker.herokuapp.com`.

3. Click the 'Generate Winner' button. Once the countdown reaches 0, you should be redirected to the 'Congratulations' page, and the app should automatically text a random participant "Congratulations! Please come to the front to pick up your prize."

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

7. Finally, install `nodemon` so you don't have to restart your app every time you make a change.

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

