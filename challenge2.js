/**
DO NOT DELETE THIS!!
TeGriAi Testing, Ticker, Bots, 9/24/2023
*/


const {EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");
module.exports = {
    name: 'calc',
    description: 'Calulator Command',
    options: [
        {
            name: 'first_digit',
            description: 'המספר הראשון',
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                { name: '1', value: '1'},
                { name: '2',value: '2'},
                { name: '3',value: '3'},
                { name: '4',value: '4'},
                { name: '5',value: '5'},
                { name: '6',value: '6'},
                { name: '7',value: '7'},
                { name: '8',value: '8'},
                { name: '9',value: '9'},
                { name: '0',value: '0'}
            ],
        },
        {
            name: 'operator',
            description: 'מה הפעולה שתרצה להשתמש בה?',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: '+',value: '+'},
                { name: '-',value: '-'},
                { name: '*',value: '*'},
                { name: '/',value: '/'},
            ],
        },
        {
            name: 'second_digit',
            description: 'המספר השני',
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                { name: '1', value: '1'},
                { name: '2',value: '2'},
                { name: '3',value: '3'},
                { name: '4',value: '4'},
                { name: '5',value: '5'},
                { name: '6',value: '6'},
                { name: '7',value: '7'},
                { name: '8',value: '8'},
                { name: '9',value: '9'},
                { name: '0',value: '0'}
            ],
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply();
        const firstdigit = interaction.options.getInteger("first_digit");
        const seconddigit = interaction.options.getInteger("second_digit");
        const operator = interaction.options.getString("operator");
        const result = eval(`${firstdigit}${operator}${seconddigit}`)
        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`התוצאה של \`${firstdigit}${operator}${seconddigit}\` היא - \`${result}\``);
        return interaction.editReply({embeds: [embed]});
    },
};