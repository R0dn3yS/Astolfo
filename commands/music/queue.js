const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    if (!queue.tracks[0]) return message.channel.send('No music in queue.');

    const embed = new MessageEmbed();
    const methods = ['🔁', '🔂'];

    embed.setColor('RANDOM');
    embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
    embed.setTitle(`Queue - ${message.guild.name} ${methods[queue.repeatMode]}`);

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track.requestedBy.id}>)`);

    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `And **${songs - 5}** more` : `There are **${songs}** songs in the queue.`;

    embed.setDescription(`Currently Playing: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}\nVolume: **${queue.volume}%**`);
    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
}