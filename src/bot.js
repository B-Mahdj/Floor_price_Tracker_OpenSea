//Main entrypoint of our bot
//Call environment variables inside the .env file
require('dotenv').config();
MILLISECONDES_BEFORE_REFRESH=10000;
NUMBER_OF_NFT_IN_COLLECTION=10000;

//print dans la console la variable nommée dans .env 
//console.log(process.env.DISCORD_BOT_TOKEN);

//Import the Client class from the library 
const Discord = require('discord.js');
const { cp } = require('fs');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
  const GUILD_ID = client.guilds.cache.map(guild => guild.id);
  const guild = await client.guilds.fetch(GUILD_ID[0]);

  console.log('Bot is connected...');
  var floor_price;

  setInterval(async function(){
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://api.opensea.io/api/v1/collection/doodles-official/stats',
      'headers': {
      }
    };
    request(options, function (error, response, body) {
      if(error) console.log('error', err);
      var json = JSON.parse(body);
      console.log(json);
      //Get Floor price of the collection
      floor_price=json.stats.floor_price;

      //Print it in console 
      console.log("The floor price returned is : ")
      console.log(floor_price);
    });

    const nickname = `FP\: ${floor_price} SOL`;
    console.log(nickname);
    guild.me.setNickname(nickname);
  }, MILLISECONDES_BEFORE_REFRESH)

});

function floatParse2(x) {
  return Number.parseFloat(x).toFixed(2);
}

//Log our bot in using the variable 
client.login(process.env.DISCORD_BOT_TOKEN);