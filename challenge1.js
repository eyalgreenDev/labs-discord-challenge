/**
DO NOT DELETE THIS!!
TeGriAi Testing, Ticker, Bots, 9/24/2023
*/

const {EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder} = require("discord.js");
module.exports = {
    name: 'meme',
    description: 'Meme Command',
    run: async (client, interaction) => {
        await interaction.deferReply();
                await interaction.editReply({content: 'בדיחות',components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('meme_btn')
                .setLabel("בדח אותי")
                .setStyle("Primary")
            ),
        ]});
    },
};



//BUTTON INTERACTION
client.on("interactionCreate", async (interaction) => {
if(interaction.isButton() && interaction.customId === 'meme_btn'){
  const memes = [
    {
        name: 'מה עושה קרש בבית ספר?',
        answer: 'כותב תזוזות!'
    },
    {
        name: 'איזה עץ תמצא בכל בית?',
        answer: 'קרש'
    },
    {
        name: 'איך קרש נוגעת לעניין?',
        answer: 'היא יושבת בבר, מחכה להתנהג במגונן.'
    },
    {
        name: 'למה קרש עצובה?',
        answer: 'היא רוצה להתקשר לאמא שלה, אבל נתקעה תחת המיטה!'
    },
    {
        name: 'מה עושה קרש בסוף שבוע?',
        answer: 'נופשת על החוף ומתקשרת עם סירת גלישה!'
    },
]
  const random=memes[Math.floor(Math.random()* memes.length)]
return interaction.reply({content: `**${random.name}**\n\`${random.answer}\``,ephemeral: true});
}
});