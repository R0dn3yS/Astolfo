module.exports = {
  name: 'pop',
  aliases: ['rm', 'remove'],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const index = parseInt(args[0]) - 1;

    if (!queue.tracks[index]) {
      return message.channel.send('Queue isn\'t that long.');
    } else {
      message.channel.send(`**Remove from queue:** ${queue.tracks[index]}`);
      queue.remove(index);
    }
  }
}