This Discord Bot lets users apply for roles themselves, by clicking emoticons corresponding to specific roles.
It only works with reactions on the first message in a channel called "introduction". 
Emoji names need to be the same as the corresponding roles, eg. Role "Immersive Design" and Emoji "immersivedesign". Spaces and capitals are ignored.

To create the bot:
```
Go to https://discord.com/developers/applications
Click New Application
Give it a name like "MIA Role Bot"
Give it a description
Upload an app icon
In the menu section go to Bot to add a Bot user
Click Add Bot
Copy the token and paste it in ./config/config.json (first make a copy of config.json.example)
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
# sudo npm install -g nodemon # optional
npm install
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
# or node .
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
git clone https://github.com/vincentsijben/mia-discord-role-bot.git
cd mia-discord-role-bot
npm i
cd config
mv config.json.example config.json
//copy paste your token
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
If there's an update in the code, make sure it's pushed to the online repository and run this on the server:
```
cd ~/mia-discord-role-bot
git stash
git pull
pm2 kill
pm2 start ./src/bot.js
```

## Login to server
If you don't have access anymore or get a Permission denied message when trying to SSH, do the following:

1. reset the root password in Digital Ocean's dashboard for this droplet.
2. Launch the recovery console, enter the emailed root password and set a new one, for example: sdada#@#GF1
3. Run this command on the server: `nano ~/.ssh/authorized_keys`
4. Switch to your local machine and generate a new local ssh key with the command: ssh-keygen
5. Give it a name like `/Users/vincent.sijben/.ssh/id_rsa_discord`
6. Copy the contents of the key with the command: `cat ~/.ssh/id_rsa_discord.pub`
7. Divide it in 5 chunks, because the recovery tool in Digital Ocean is buggy as hell while copying large amounts of texts.
8. Paste these chunks in to the authorized_keys file that you've opened on the server.
9. Restart the server
10. Edit your local ssh config: `sudo nano ~/.ssh/config` and put in:
```
Host miadiscord
        HostName 165.232.68.154
        User root
        IdentityFile /users/vincent.sijben/.ssh/id_rsa_discord
        IdentitiesOnly yes
```
11. connect to server with: `ssh -i ~/.ssh/id_rsa_discord root@165.232.68.154` or `ssh miadiscord`
12. If it doesn't work run this on the server: `nano /etc/ssh/sshd_config` and change `PasswordAuthentication` to `yes`.
13. reload the SSH config with `serivce sshd reload`.
14. Now you can run this from your local machine: ssh-copy-id root@165.232.68.154 and you're good to go.