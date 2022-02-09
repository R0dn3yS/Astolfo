const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: 'loop',
  aliases: [],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    if (args.join('').toLowerCase() === 'queue') {
      if (queue.repeatMode === 1) return message.channel.send('You should disable loop mode of existing music first.');

      const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

      return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**` : 'Something went wrong.');
    } else {
      if (queue.repeatMode === 2) return message.channel.send('You should disable loop mode of existing queue first.');

      const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

      return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**` : 'Something went wrong.');
    }
  }
}
