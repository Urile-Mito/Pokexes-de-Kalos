const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = "Pon tu Token Aqui"

client.once('ready', () => {
    console.log('Bot está listo!');
});

client.login(TOKEN);

const pokedex = require('./pokedex');

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!pokedex')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            message.reply('Por favor, proporciona un número o nombre de Pokémon.');
            return;
        }
        const searchTerm = args[1].toLowerCase();
        const pokemon = pokedex.find(p => p.name.toLowerCase() === searchTerm || p.number.toString() === searchTerm);

        if (pokemon) {
            message.reply(`**${pokemon.name}** (#${pokemon.number})\nTipo: ${pokemon.type}\nDescripción: ${pokemon.description}`);
        } else {
            message.reply('Pokémon no encontrado.');
        }
    }
});