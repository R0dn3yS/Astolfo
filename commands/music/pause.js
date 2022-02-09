module.exports = {
  name: 'pause',
  aliases: ['ps'],
  run: async (message, client, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const success = queue.setPaused(false);

    return message.channel.send(success ? 'Music Resumed.' : 'Something went wrong.');
  }
}