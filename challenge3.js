/**
DO NOT DELETE THIS!!
TeGriAi Testing, Ticker, Bots, 9/24/2023
*/

const {EmbedBuilder,ApplicationCommandOptionType} = require("discord.js");
const axios = require("axios");
const cheerio = require('cheerio-without-node-native');
async function Lyrics(song, artist, genius) {
try{
    const q = `${song} ${artist}`;
    const searchurl = `https://api.genius.com/search?q=${encodeURIComponent(q)}`;
    const headers = {
        Authorization: `Bearer ${genius}`
    };
    const {data} = await axios.get(searchurl, { headers });
    const hits = data.response.hits;
    if(!hits || !hits.length){
        const searchResultUrl = `https://genius.com/${encodeURIComponent(song)}-${encodeURIComponent(artist)}-lyrics`;
        const { data: searchResultData } = await axios.get(searchResultUrl);
        const $ = cheerio.load(searchResultData);
        const lyrics = $('div[class="lyrics"]').text().trim();
        if (!lyrics) {
            return 'No Lyrics Found';
        }
        return lyrics;
    }
    const url = `https://api.genius.com/songs/${hits[0].result.id}`;
    const res = await axios.get(url, { headers });
    const lyrics = await lyrics2(res.data.response.song.url);
    return lyrics;
}catch(err){
    console.log(err);
    return 'Error' + err
}
};
async function lyrics2(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let lyrics = $('div[class="lyrics"]').text().trim();
        if (!lyrics) {
            lyrics = '';
            $('div[class^="Lyrics__Container"]').each((i, elem) => {
                if ($(elem).text().length !== 0) {
                    let snippet = $(elem)
                        .html()
                        .replace(/<br>/g, '\n')
                        .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
                    lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
                }
            });
        }
        if (!lyrics) return null;
        return lyrics.trim();
    } catch (e) {
        throw e;
    }  
};
async function getThumbnail(song, artist, google) {
    try{
        const searchQuery = `${song} ${artist} official video`;
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${google}&q=${encodeURIComponent(searchQuery)}&type=video&part=snippet&maxResults=1`;
        const response = await axios.get(searchUrl);
        const videoId = response.data.items[0]?.id?.videoId;
        if (!videoId) {
            return null;
        }
        return `https://img.youtube.com/vi/${videoId}/default.jpg`;
    }catch(err){
        console.log(err);
        return 'Error'
    }
}
module.exports = {
    name: 'lyrics',
    description: 'Search a lyrics for a song',
    options: [
        {
            name: 'song',
            description: 'The song you want to search for',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'artist',
            description: 'The artist you want to search for',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const song = interaction.options.getString('song');
        const artist = interaction.options.getString('artist');
        const lyrics = await Lyrics(song, artist, process.env.GENIUS)
        const thumbnail = await getThumbnail(song, artist, process.env.GOOGLE);
        const embed=new EmbedBuilder()
        .setColor('Random')
        .setAuthor({name: `Song Lyrics`,iconURL: interaction.guild.iconURL({dynamic: true})})
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))
        .setImage(thumbnail)
        .setDescription(`\`\`\`${lyrics}\`\`\``)
        .setFooter({text: `Requested by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp();
        return interaction.editReply({ embeds: [embed] });
    }
}