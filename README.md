This Discord Bot lets users apply for roles themselves, by clicking emoticons corresponding to specific roles.
It only works with reactions on the first message in a channel called "introduction". 
Emoji names need to be the same as the corresponding roles, eg. Role "Immersive Design" and Emoji "immersivedesign". Spaces and capitals are ignored.

To create the bot:
```
Go to https://discord.com/developers/applications
Click New Application
Give it a name like "CMD Role Bot"
Give it a description
Upload an app icon
In the menu section go to Bot to add a Bot user
Click Add Bot
Copy the token and paste it in ./config/config.json
In the menu section go to OAuth2
In the scopes section choose "bot"
In the bot permissions section choose "Manage Roles"
---
Go to the BOT menu and enable both "Privileged Gateway Intents" intents.
---
Copy the URL, paste it in your browser, pick the correct server the bot needs to be added to.
Go to Discord - Serversettings - Roles and make sure the bot role itself is above the other roles (right beneath admin)
```



To install this project:
```
npm install --save discordjs/discord.js
sudo npm install -g nodemon
```
be sure to have git configured:
```
git config --global user.name "Vincent Sijben"
git config --global user.email "vincent.sijben@zuyd.nl"
```

add this to the scripts section of package.json:
```
"dev": "nodemon ./src/bot.js"
```
and run the program with:
```
npm run dev
// or node .
```

Now nodemon will start and every change in bot.js will restart the application automatically.

# install Digital Ocean droplet
Set up SSH keys and connect with:
```
ssh root@165.232.68.154
//install node:
sudo apt update
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install npm
sudo npm install -g pm2
sudo apt install git-all
cd ~
git clone https://github.com/vincentsijben/discord-role-bot.git
cd discord-role-bot
npm i
```
to start:
```
pm2 start ./src/bot.js
//start pm2 after reboot
pm2 startup systemd
//to see logs
pm2 logs bot
//to kill
pm2 kill
```
