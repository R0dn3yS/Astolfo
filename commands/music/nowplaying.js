const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],

  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const track = queue.current;

    const embed = new MessageEmbed();

    embed.setColor('RANDOM');
    embed.setThumbnail(track.thumbnail);
    embed.setTitle(track.title);

    const methods = ['disabled', 'track', 'queue'];

    const progress = queue.createProgressBar();
    const timestamp = queue.getPlayerTimestamp();
    const trackduration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

    embed.setDescription(`Audio **${queue.volume}%**\nDuration **${trackduration}**\nLoop Mode **${methods[queue.repeatMode]}**\n\n${timestamp.progress}%\n${progress}\n\n${track.requestedBy}`);

    embed.setTimestamp();

    const saveButton = new MessageButton();

    saveButton.setLabel('Save Song');
    saveButton.setCustomId('saveTrack');
    saveButton.setStyle('SUCCESS');

    const row = new MessageActionRow().addComponents(saveButton);

    message.channel.send({ embeds: [embed], components: [row] });
  }
}