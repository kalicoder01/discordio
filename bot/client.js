const { MessageEmbed, WebhookClient } = require('discord.js');
const { webhookId, webhookToken } = require('../config/bot');

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

function addBotMessage(bot) {
    const embed = new MessageEmbed()
        .setTitle('На мониторинг был добавлен новый бот')
        .setDescription(`Бот **${bot}** был добавлен на мониторинг. Нужно верифицировать данного бота.`);

    webhookClient.send({
        username: 'discordio',
        avatarURL: 'https://i.imgur.com/t2cBPGn.png',
        embeds: [
            embed
        ],
    });
}

module.exports = {
    addBotMessage
}
