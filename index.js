require('discord-player/smoothVolume');
const { Client, Intents, Collection, } = require('discord.js');
const { Player } = require('discord-player');
const { readdirSync, } = require('fs');
const { token, prefix, opt } = require('./config.js')

const client = new Client({ intents: new Intents(32767) });

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync('./commands/');

client.player = new Player(client, opt.discordPlayer);
const player = client.player;

['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.once('ready', () => {
  console.log(`${client.user.username} is ready on ${client.guilds.cache.size} servers.`);

  client.user.setPresence({
    activities: [{
      name: 'Music',
      type: 'LISTENING',
    }],
    status: 'online',
  });
});

// Command Handling
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.member.id === '375339016121483275') return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (!command.name === 'ping') {
    if (message.channel.id !== '789773907292979231') return;
    if (!message.member.voice.channel) return;
  }
  if (command) command.run(client, message, args);
});

// Event Handling
client.on('interactionCreate', (int) => {
  if (!int.isButton()) return;

  const queue = client.player.getQueue(int.guildId);

  switch (int.customId) {
    case 'saveTrack': {
      if (!queue || !queue.playing) return int.reply({ content: 'There is no music currently playing.', ephemeral: true, components: [] });

      int.member.send(`**Track Saved: \`${queue.current.title}\` | Posted by \`${queue.current.author}\`, Saved Server: \`${int.member.guild.name}\`**`).then(() => {
        return int.reply({ content: `I sent you the name of the music in a private message.`, ephemeral: true, components: [] });
      }).catch(error => {
        return int.reply({ content: `I can't send you a private message.`, ephemeral: true, components: [] });
      });
    }
  }
});

// Music Player Events
player.on('trackStart', (queue, track) => {
  if (!opt.loopMessage && queue.repeatMode !== 0) return;
  queue.metadata.send(`Started playing: **${track.title}**`);
  client.user.setPresence({
    activities: [{
      name: track.title,
      type: 'LISTENING',
    }],
    status: 'online',
  });
})

player.on('queueEnd', (queue) => {
  queue.metadata.send('Queue has ended.');
  client.user.setPresence({
    activities: [{
      name: 'Music',
      type: 'LISTENING',
    }],
    status: 'online',
  });
});

client.login(token);
