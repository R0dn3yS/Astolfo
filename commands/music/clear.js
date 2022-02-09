module.exports = {
  name: 'clear',
  aliases: [],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    if (!queue.tracks[0]) return message.channel.send('No music in queue.');

    await queue.clear();

    message.channel.send('The queue has been cleared.');
  }
}
