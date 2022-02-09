module.exports = {
  name: 'skip',
  aliases: ['s'],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const success = queue.skip();

    return message.channel.send(success ? `Skipped: **${queue.current.title}**` : 'Something went wrong.');
  }
}