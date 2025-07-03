// MADE BY SYNTAX

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function installModules() {
    const requiredModules = [
        'discord.js-selfbot-v13',
        'chalk',
        'figlet',
        'moment'
    ];

    requiredModules.forEach(module => {
        try {
            require.resolve(module);
        } catch (err) {
            console.log(`Installing missing module: ${module}`);
            try {
                execSync(`npm install ${module}`, { stdio: 'inherit' });
            } catch (installError) {
                console.error(`Failed to install ${module}:`, installError);
            }
        }
    });
}


installModules();


const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');
const figlet = require('figlet');
const moment = require('moment');


const config = {
    token: 'TOKEN', // Replace with your token
    status: {
        type: 'dnd',
        emoji: '🌟'
    }
};


const client = new Discord.Client({
    checkUpdate: false,
    autoRedeemNitro: true,
    captchaService: 'capmonster.cloud',
    syncStatus: true
});

// Rich Presence States with Enhanced Configurations
const rpcStates = [
    {
        type: 'STREAMING',
        name: 'Coding Adventures',
        details: '! Syntax 🥀',
        state: 'Mxybe a dev?',
        url: 'https://www.twitch.tv/Syntax',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1319666530828550206/1327569707930484766/Aura.gif?ex=678e1723&is=678cc5a3&hm=19c91a1b88cde99b704f67591765e14c5e3f8ba3685fe4bd299c486a98a91ed7&=',
            largeText: 'Code Wizard',
            smallImage: 'https://cdn.discordapp.com/emojis/1224756226311852042.gif?size=48',
            smallText: 'Hacker Mode'
        },
        buttons: [
            { label: 'GitHub', url: 'https://github.com/WannaBeGhoSt' },
            { label: 'Support', url: 'https://discord.gg/5yqxjKdyy8' }
        ]
    },
    {
        type: 'WATCHING',
        name: 'Pihu',
        details: 'I Love Pihu <3',
        state: 'She is mine',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1318214017009061941/1330475639668609065/couple_gifs.gif?ex=678e1d7f&is=678ccbff&hm=6c54617923dba04579f418287266a1de0d568e53ad0896ee1673b45dcf43ee9f&=',
            largeText: 'Syntax Love Pihu',
            smallImage: 'https://cdn.discordapp.com/emojis/1208635453331214358.gif?size=48',
            smallText: 'Pihu Qt'
        },
        buttons: [
            { label: 'Ownz..?', url: 'https://discord.gg/5yqxjKdyy8' },
            { label: 'Bio', url: 'https://guns.lol/xpy3' }
        ]
    },
    {
        type: 'PLAYING',
        name: '/query in mind',
        details: 'Debugging Life',
        state: 'Raiding Mode',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1318214017009061941/1330475624242089984/download.gif?ex=678e1d7b&is=678ccbfb&hm=0b96e17d65457635269e2547a4ea476f68bd29b85e751294bcf0497b6b3358e6&=',
            largeText: 'Raid Mode',
            smallImage: 'https://cdn.discordapp.com/emojis/1312633052668629055.gif?size=48',
            smallText: 'Be aware'
        },
        buttons: [
            { label: 'H O M E T O W N', url: 'https://discord.gg/query' },
            { label: 'Bio', url: 'https://guns.lol/xpy3' }
        ]
    }
];


function log(message, type = 'info') {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const colors = {
        info: chalk.blueBright,
        success: chalk.greenBright,
        error: chalk.redBright,
        warning: chalk.yellowBright
    };

    const logTypes = {
        info: '📌 INFO',
        success: '✅ SUCCESS',
        error: '❌ ERROR',
        warning: '⚠️ WARNING'
    };

    console.log(
        colors[type](
            `[${logTypes[type]}] ${timestamp} → ${message}`
        )
    );
}


function rotateRichPresence() {
    let currentIndex = 0;

    const updatePresence = () => {
        const currentState = rpcStates[currentIndex];
        
        try {
           
            const activity = new Discord.RichPresence(client)
                .setType(currentState.type)
                .setName(currentState.name)
                .setDetails(currentState.details)
                .setState(currentState.state);

           
            if (currentState.type === 'STREAMING' && currentState.url) {
                activity.setURL(currentState.url);
            }

            
            if (currentState.timestamps) {
                activity.setStartTimestamp(currentState.timestamps.start);
            }

            
            if (currentState.assets) {
                activity
                    .setAssetsLargeImage(currentState.assets.largeImage)
                    .setAssetsLargeText(currentState.assets.largeText)
                    .setAssetsSmallImage(currentState.assets.smallImage)
                    .setAssetsSmallText(currentState.assets.smallText);
            }

            
            if (currentState.buttons) {
                currentState.buttons.forEach(btn => 
                    activity.addButton(btn.label, btn.url)
                );
            }

            
            client.user.setActivity(activity);

            
            log(`Switched to ${currentState.name} RPC`, 'info');
        } catch (error) {
            log(`RPC Update Error: ${error.message}`, 'error');
        }

        
        currentIndex = (currentIndex + 1) % rpcStates.length;
    };

    
    updatePresence();

    // Rotate Every 45 Seconds
    setInterval(updatePresence, 45000);
}

client.on('ready', async () => {
    console.clear();
    
    
    console.log(
        chalk.magentaBright(
            figlet.textSync('Syntax RPC', { 
                font: 'Slant', 
                horizontalLayout: 'default', 
                verticalLayout: 'default' 
            })
        )
    );

    
    log(`Successfully Authenticated`, 'success');
    log(`Logged in as ${client.user.tag}`, 'info');
    log(`User ID: ${client.user.id}`, 'info');
    
    
    client.user.setStatus(config.status.type);
    
    
    rotateRichPresence();
});


client.on('error', (error) => {
    log(`Client Connection Error: ${error.message}`, 'error');
});

process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled System Rejection: ${reason}`, 'warning');
});


process.on('SIGINT', () => {
    log('Selfbot shutting down gracefully', 'warning');
    client.destroy();
    process.exit(0);
});


client.login(config.token);