// based on https://www.youtube.com/watch?v=98Wi_MJ1wOI

require('log-timestamp');
const discord = require('discord.js');
const client = new discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('../config/config.json');
client.login(config.TOKEN);

client.on('ready', () => {
    console.log(client.user.tag + " has logged in.");
});

// client.on('raw', console.log);

client.on('messageReactionAdd', async (reaction, user) => {
    handleReaction(reaction, user, "apply");
});
client.on('messageReactionRemove', async (reaction, user) => {
    handleReaction(reaction, user, "remove");
});

let handleReaction = async function (reaction, user, applyOrRemove) {

    let serverName = reaction.message.channel.guild.name;
    console.log(`---------------------`);
    console.log(`Server: ${serverName}`);
    console.log(`---------------------`);
    console.log(``);
    
    // only run code in introduction channel
    if (!(reaction.message.channel.name === "introduction")) {
        console.log(`"${reaction.message.channel.name}" is *NOT* the introduction channel`);
        return;
    }
    
    let firstMessage = await reaction.message.channel.messages.fetch({ after: 0, limit: 1 });
    let firstMsgID = firstMessage.first().id;

    //check if its a partial message (an old message, that was not cached)
    if (reaction.message.partial) {
        console.log("A partial.");
        try {
            let msg = await reaction.message.fetch();

            // only run code if user reacts on the first message in this channel
            if (msg.id === firstMsgID) {
                if (applyOrRemove === "apply") applyRole(reaction, user);
                if (applyOrRemove === "remove") removeRole(reaction, user);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.log("Not a partial.");

        // only run code if user reacts on the first message in this channel
        if (reaction.message.id === firstMsgID) {
            if (applyOrRemove === "apply") applyRole(reaction, user);
            if (applyOrRemove === "remove") removeRole(reaction, user);
        }
    }

    
}

let applyRole = async (reaction, user) => {
    let emojiName = reaction.emoji.name;
    let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/\s+/g, '') === emojiName.toLowerCase());
    let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    try {
        if (role && member) {
            console.log(`Role ${role.name} will be added for member ${member.user.username}.`);
            await member.roles.add(role);
            console.log("Done adding role.");
        }
    }
    catch (err) {
        console.log(err);
    }
}

let removeRole = async (reaction, user) => {
    let emojiName = reaction.emoji.name;
    let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase().replace(/\s+/g, '') === emojiName.toLowerCase());
    let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    try {
        if (role && member) {
            console.log(`Role ${role.name} will be removed for member ${member.user.username}.`);
            await member.roles.remove(role);
            console.log("Done removing role.");
        }
    }
    catch (err) {
        console.log(err);
    }
}





