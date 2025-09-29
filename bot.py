from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton
import asyncio

BOT_TOKEN = "8060267278:AAE6PZKLizsIALwzzlB8Pqo0v_2sFKbaLcE"

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(commands=["start"])
async def start_cmd(message: types.Message):
    kb = ReplyKeyboardMarkup(resize_keyboard=True)
    kb.add(KeyboardButton(
        text="Открыть WebApp 🌌",
        web_app=WebAppInfo(url="https://savich18423.github.io/friendly-meme/")
    ))
    await message.answer("Привет 👋 вот твой бот!\nЖми кнопку ниже, чтобы открыть WebApp:", reply_markup=kb)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
