import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv'
dotenv.config()
import { calcPeople, PersonEmpty } from './calc'
const token: string | undefined = process.env.TELEGRAM_BOT_TOKEN

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}
const bot = new Telegraf(token);

bot.command('start', (ctx) => {
  ctx.reply(`
  Привет! Чтобы произвести расчет, отправь список участников и вложенные ими суммы в формате: Имя - сумма, Имя2 - сумма. 
  Участников, сумма вкладов которых равна нулю , можно просто перечислить через запятую, не указывая ноль. Не используй лишние символы и слова при вводе. 
  
  ❌ Ира1000,Даня - 4000 (имя и сумма не разделены дефисом) 
  ❌ Ира - 100 рублей, Даня-5000 рублей (слово «рублей» - лишнее)
  ❌ Ира - 1000 Даня - 5000 (отсутствует запятая между участниками)
  ❌Ира - 1000, Даня, Артем, Саша(Мало того, что вложилась только Ира, так еще и точку в конце ставить было не нужно) 
  ✅ Ира-1000,Даня - 5000
  ✅Ира - 1000,Даня-5000,Артем,Саша
  `)
})

bot.on('text', async (ctx) => {
  let people: PersonEmpty[] = []
  console.log(ctx.message.text.replaceAll(' ', ''));
  let message: string = ctx.message.text.replaceAll(' ', '')
  if (message.length) {
    console.log(message.split(','));
    message.split(',').map(el => {
      people.push({
        name: el.split('-')[0],
        sum: !isNaN(Number(el.split('-')[1]))  ? Number(el.split('-')[1]) : 0
      })
      
    })
    console.log(people);
  } else {
    ctx.reply('Введите сообщение в нужном формате!')
  }
  let result: string = calcPeople(people)
  console.log(result);
  ctx.reply(result)

});

bot.launch();


