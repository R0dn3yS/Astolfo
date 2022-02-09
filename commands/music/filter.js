module.exports = {
  name: 'filter',
  aliases: [],
  run: async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send('There is no music currently playing.');

    const actualFilter = queue.getFiltersEnabled()[0];

    if (!args[0]) return message.channel.send('Please enter a valid filter name. \n`bassboost, 8D, nightcore`');

    const filters = [];
    queue.getFiltersEnabled().map(x => filters.push(x));
    queue.getFiltersDisabled().map(x => filters.push(x));

    const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

    if (!filter) return message.channel.send('I couldn\'t find a filter with your name. ❌\n`bassboost, 8D, nightcore`');

    const filtersUpdated = {};

    filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

    await queue.setFilters(filtersUpdated);

    message.channel.send(`Applied: **${filter}**, Filter Status: **${queue.getFiltersEnabled().includes(filter) ? 'Active' : 'Inactive'}**`);
  }
}