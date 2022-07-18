const {
    Telegraf
} = require('telegraf')
const axios = require('axios')
const {
    telegrafThrottler
} = require('telegraf-throttler');
var _ = require('lodash');
const config = require('./coin.json');
var express = require('express');
var app = express();
const bot = new Telegraf('5585251919:AAFbZDRWxlPS7YOcr0a0ryo_rEa0v1YOjR8')
const throttler = telegrafThrottler();
bot.use(throttler);
app.get('/', function (req, res) {
  res.send('Hello Worl!');
});
bot.command('start', (ctx) => { ctx.reply('Welcome to our coingecko price bot')
	ctx.reply('Get price of all tokens listed on coingecko using our bot.')
		ctx.reply('Send /help to get tutorial on how to start!')
			       bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just joined the bot`) 
			      





        

          

        

        





          

        

      

      

        

     

      

        



  
				       
				      

			       
		   })
bot.command('getprice', (ctx) => {
  bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just clicked get price`)
    var arr;
    const doc = ctx.update.message.text.split('').slice(10).join('');

    if (doc === '') {
        ctx.telegram.sendMessage(ctx.chat.id, "Invalid format")
        ctx.telegram.sendMessage(ctx.chat.id, `Use  [ /getprice {crypto_name} ] to get price of crypto-coin.`)

    } else {
        arr = config.filter(function(value) {
            return value.name === doc
        })
        if (_.isEmpty(arr)) {
            bot.telegram.sendMessage(ctx.chat.id, 'Please ensure the name of coin/token is correct.')
            bot.telegram.sendMessage(ctx.chat.id, 'Send /help command to get help!')
            ctx.replyWithPhoto({ source: './bitcoin.png' });
        } else {
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${arr[0].id}&vs_currencies=usd`).then(res => {
                bot.telegram.sendMessage(ctx.chat.id,
                    `The price of ${doc} is ${Object.values(res.data)[0].usd}$ according to coingecko!`
                )
            }).catch(e => {
                bot.telegram.sendMessage(ctx.chat.id,
                    "Sorry some error occured in our server,please try again!⚡"
                )
            })

        }
    }
})
bot.command('gettrending', (ctx) => {
	bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just clicked get trending`)
    bot.telegram.sendMessage(ctx.chat.id, "<i>⚡The 7 trending search today in coingecko are:-</i>", {
        parse_mode: 'HTML'
    })
    var data = []
    axios.get('https://api.coingecko.com/api/v3/search/trending').then(r => {
        for (var i = 0; i < r.data.coins.length; i++) {
            data.push(`${i+1}). ${r.data.coins[i].item.name}`)
        }

        bot.telegram.sendMessage(ctx.chat.id, `<pre>${data.join('\r\n')}</pre>`, {
            parse_mode: 'HTML'
        })
    }).catch(e => {
	    console.log(e) 
        bot.telegram.sendMessage(ctx.chat.id,
            "Sorry some error occured in our server,please try again!⚡"
        )

    })
})
bot.command('mcap', (ctx) => {
bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just clicked mcap`)
    var array;

    const msg = ctx.update.message.text.split('').slice(6).join('');


    if (msg === '') {

        ctx.telegram.sendMessage(ctx.chat.id, "Invalid format")

        ctx.telegram.sendMessage(ctx.chat.id, `Use  [ /mcap {crypto_name} ] to get 24hr market cap  of crypto-coin.`)



    } else {

        array = config.filter(function(value) {

            return value.name === msg

        })

        if (_.isEmpty(array)) {

            bot.telegram.sendMessage(ctx.chat.id, 'Please ensure the name of coin/token is correct.')

            bot.telegram.sendMessage(ctx.chat.id, 'Send /help command to get help!')
            ctx.replyWithPhoto({ source: './bitcoin.png' });

        } else {

            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${array[0].id}&vs_currencies=usd&include_market_cap=true`).then(res => {

                bot.telegram.sendMessage(ctx.chat.id,

                    `<b>⚡The 24hr market cap of ${msg} is </b>  <pre>${Object.values(res.data)[0].usd_market_cap}$</pre>  <b> according to coingecko!⚡</b>`, {  parse_mode: 'HTML'})

            }).catch(eok => {

                console.log(eok)

                bot.telegram.sendMessage(ctx.chat.id,

                    "Sorry some error occured in our server,please try again!⚡"

                )

            })

        }

    }



})
bot.command('24hrvol', (ctx) => {
bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just clicked 24hrvol`)
var take;
const query = ctx.update.message.text.split('').slice(9).join('');

if(query === ''){
ctx.telegram.sendMessage(ctx.chat.id,"Invalid format")
ctx.telegram.sendMessage(ctx.chat.id,`Use  [ /24hrvol {crypto_name} ] to get 24 hr volume of crypto-coin.`)

}
else{
take = config.filter(function(value) {
    return value.name === query
    })
if(_.isEmpty(take)){
bot.telegram.sendMessage(ctx.chat.id,'Please ensure the name of coin/token is correct.')
bot.telegram.sendMessage(ctx.chat.id,'Send /help command to get help!')
ctx.replyWithPhoto({ source: './bitcoin.png' });
}
else{
axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${take[0].id}&vs_currencies=usd&include_24hr_vol=true`).then(res =>{
bot.telegram.sendMessage(ctx.chat.id,
`The 24hr volume of ${query} is ${Object.values(res.data)[0].usd_24h_vol}$ according to coingecko!`
)
}).catch(e=>{
bot.telegram.sendMessage(ctx.chat.id,
"Sorry some error occured in our server,please try again!⚡"
)
})

}
}
})
bot.command('24hrchange', (ctx) => {
	bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just clicked 24hrchange`)
var div;
const tok = ctx.update.message.text.split('').slice(12).join('');

if(tok === ''){
ctx.telegram.sendMessage(ctx.chat.id,"Invalid format")
ctx.telegram.sendMessage(ctx.chat.id,`Use  [ /24hrchange {crypto_name} ] to get 24 hr volume of crypto-coin.`)

}
else{
div = config.filter(function(value) {
    return value.name === tok
    })
if(_.isEmpty(div)){
bot.telegram.sendMessage(ctx.chat.id,'Please ensure the name of coin/token is correct.')
bot.telegram.sendMessage(ctx.chat.id,'Send /help command to get help!')
ctx.replyWithPhoto({ source: './bitcoin.png' });
}
else{

axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${div[0].id}&vs_currencies=usd&include_24hr_change=true`).then(res =>{

if((Object.values(res.data)[0].usd_24h_change).toString().includes('-')){
bot.telegram.sendMessage(ctx.chat.id, `The price of ${tok}  is down by ${(Object.values(res.data)[0].usd_24h_change).toFixed(2).toString().replace(/\-/g, '') }% ⬇️ in last 24hr`)
}
else{
bot.telegram.sendMessage(ctx.chat.id, `The price of ${tok}  is up by ${(Object.values(res.data)[0].usd_24h_change).toFixed(2).toString().replace(/\+/g, '') }% ⬆️ in last 24hr`)
}

}).catch(e=>{
bot.telegram.sendMessage(ctx.chat.id,
"Sorry some error occured in our server,please try again!⚡"
)
})

}
}
})
bot.command('help',(ctx) => {
	bot.telegram.sendMessage("@gaito277e", `@${ctx.chat.username} , ${ctx.chat.first_name} ${ctx.chat.last_name} just asked for help`)
	bot.telegram.sendMessage(ctx.chat.id, 'Ensure you have written token/coin well. Which should be like:-')
	bot.telegram.sendMessage(ctx.chat.id,'/getprice Bitcoin not /getprice bitcoin or /getprice BitCoin')
	bot.telegram.sendMessage(ctx.chat.id,'The token name should match with name in coingecko! Same goes with other query like volume, change, market cap')
	ctx.replyWithPhoto({ source: './bitcoin.png' });
	
})
bot.launch()
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
