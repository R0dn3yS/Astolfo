module.exports = {
  name: 'stop',
  aliases: [],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    queue.destroy();
  }
}
