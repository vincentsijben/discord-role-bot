// based on https://www.youtube.com/watch?v=98Wi_MJ1wOI

const discord = require('discord.js');
const client = new discord.Client({
    partials: ['MESSAGE', 'REACTION']
});
const config = require('../config/config.json');
client.login(config.TOKEN);

client.on('ready', () => {
    console.log(client.user.tag + " has logged in.");
});

client.on('messageReactionAdd', async (reaction, user) => {

    let serverName = reaction.message.channel.guild.name;
    console.log(`---------------------`);
    console.log(`Server: ${serverName}`);
    console.log(`---------------------`);
    console.log(``);
    // only run code in introduction channel
    if (!(reaction.message.channel.name === "introduction")) {
        console.log("this is *NOT* the introduction channel");
        return;
    }
    
    let firstMessage = await reaction.message.channel.messages.fetch({ after: 0, limit: 1 });
    let firstMsgID = firstMessage.first().id;

    let applyRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/\s+/g, '') === emojiName.toLowerCase());
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        try {
            if (role && member) {
                console.log("Role and member found.");
                await member.roles.add(role);
                console.log("Done adding role.");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //check if its a partial message (an old message, that was not cached)
    if (reaction.message.partial) {
        console.log("A partial.");
        try {
            let msg = await reaction.message.fetch();

            // only run code if user reacts on the first message in this channel
            if (msg.id === firstMsgID) applyRole();
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log("Not a partial.");

        // only run code if user reacts on the first message in this channel
        if (reaction.message.id === firstMsgID) applyRole();
    }


});

client.on('messageReactionRemove', async (reaction, user) => {

    let serverName = reaction.message.channel.guild.name;
    console.log(`---------------------`);
    console.log(`Server: ${serverName}`);
    console.log(`---------------------`);
    console.log(``);
    // only run code in introduction channel
    if (!(reaction.message.channel.name === "introduction")) {
        console.log("this is *NOT* the introduction channel");
        return;
    }

    let firstMessage = await reaction.message.channel.messages.fetch({ after: 0, limit: 1 });
    let firstMsgID = firstMessage.first().id;

    let removeRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/\s+/g, '') === emojiName.toLowerCase());
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        try {
            if (role && member) {
                console.log("Role and member found.");
                await member.roles.remove(role);
                console.log("Done removing role.");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //check if its a partial message (an old message, that was not cached)
    if (reaction.message.partial) {
        console.log("A partial.");
        try {
            let msg = await reaction.message.fetch();

            // only run code if user reacts on the first message in this channel
            if (msg.id === firstMsgID) removeRole();
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log("Not a partial.");

        // only run code if user reacts on the first message in this channel
        if (reaction.message.id === firstMsgID) removeRole();
    }


})




