module.exports = {
  name: 'move',
  aliases: ['m'],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const index = parseInt(args[0] - 1);
    const targetPos = parseInt(args[1] - 1);
    const targetTrack = queue.tracks[index];

    if (!queue.tracks[index] || !queue.tracks[targetPos]) {
      return message.channel.send('Queue isn\'t that long.');
    } else {
      message.channel.send(`**Move:** ${queue.tracks[index]} to #${args[1]}`);
      queue.remove(queue.tracks[index]);
      queue.insert(targetTrack, targetPos);
    }
  }
}