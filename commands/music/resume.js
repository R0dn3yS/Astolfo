module.exports = {
  name: 'resume',
  aliases: ['rs'],
  run: async (message, client, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const success = queue.setPaused(true);

    return message.channel.send(success ? 'Music is paused.' : 'Something went wrong.');
  }
}