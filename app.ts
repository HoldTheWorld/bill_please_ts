import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv'
dotenv.config()
const token: string | undefined = process.env.TELEGRAM_BOT_TOKEN

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}
const bot = new Telegraf(token);


// import { CalcPeople } from './calc.ts'
