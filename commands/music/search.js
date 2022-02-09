const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'search',
  aliases: [],
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send('I cannot search nothing.');

    const res = await client.player.search(args.join(' '), {
      requestedBy: message.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length) return message.channel.send('No search results.');

    const queue = await client.player.createQueue(message.guild, {
      metadata: message.channel
    });

    const embed = new MessageEmbed();

    embed.setColor('RANDOM');
    embed.setTitle(`Searched Music: ${args.join(' ')}`);

    const maxTracks = res.tracks.slice(0, 10);

    embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChoose a song from **1** to **${maxTracks.length}** write **cancel** to cancel selection.`);
    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });

    const collector = message.channel.createMessageCollector({
      time: 15000,
      errors: ['time'],
      filter: m => m.author.id === message.author.id
    });

    collector.on('collect', async (query) => {
      if (query.content.toLowerCase() === 'cancel') return message.channel.send('Cancelled') && collector.stop();

      const value = parseInt(query.content);

      if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Error: select a song **1** to **${maxTracks.length}** and write send or type **cancel** to cancel selection.`);

      collector.stop();

      try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
      } catch {
        await client.player.deleteQueue(message.guild.id);
        return message.channel.send('I cannot join VC.');
      }

      queue.addTrack(res.tracks[Number(query.content)-1]);
      if (!queue.playing) {
        await queue.play();
        queue.setVolume(20);
      }
    });

    collector.on('end', (msg, reason) => {
      if (reason === 'time') return message.channel.send('Search time expired.');
    });
  }
}