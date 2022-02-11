const maxVol = require('../../config.js').opt.maxVol;

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    if (!args) return message.channel.send(`Current volume: **${queue.volume}**\n**To change the volume, Type a number between \`1\` and \`${maxVol}\`.`);

    if (args[0].startsWith('+') || args[0].startsWith('-')) {
      const relVol = parseInt(args[0].substr(1));
      const success = queue.setVolume(queue.volume + reVol);
      return message.channel.send(success ? `Volume changed: **${vol}**/**${maxVol}**` : 'Something went wrong.');
    } else {
      const vol = parseInt(args[0]);
      const success = queue.setVolume(vol);
      return message.channel.send(success ? `Volume changed: **${vol}**/**${maxVol}**` : 'Something went wrong.');
    }
  }
}