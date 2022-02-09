const { QueryType } = require('discord-player');

module.exports = {
  name: 'play',
  aliases: ['p'],
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send('I cannot play nothing.');

    const res = await client.player.search(args.join(' '), {
      requestedBy: message.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length) return message.channel.send('No results found.');

    const queue = await client.player.createQueue(message.guild, {
      metadata: message.channel,
      initialVolume: 20,
      volumeSmoothness: 0,
    });

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel);
      
    } catch {
      await client.player.deleteQueue(message.guild.id);
      return message.channel.send('I cannot join VC.');
    }

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) {
      await queue.play();
    } else {
      message.channel.send(`Added to queue: **${res.tracks[0]}**`);
    }
  }
}