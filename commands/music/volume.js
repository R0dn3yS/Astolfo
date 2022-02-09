const maxVol = require('../../config.js').opt.maxVol;

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const vol = parseInt(args[0]);

    if (!vol) return message.channel.send(`Current volume: **${queue.volume}**\n**To change the volume, Type a number between \`1\` and \`${maxVol}\`.`);

    if (queue.volume === vol) return;

    if (vol < 0 || vol > maxVol) return message.channel.send(`To change the volume, Type a number between \`1\` and \`${maxVol}\``);

    const success = queue.setVolume(vol);

    return message.channel.send(success ? `Volume changed: **${vol}**/**${maxVol}**` : 'Something went wrong.');
  }
}