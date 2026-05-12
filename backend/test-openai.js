const OpenAI = require('openai');
require('dotenv').config();

async function testOpenAI() {
  console.log('Testing OpenAI API connection...');
  console.log('API Key present:', !!process.env.OPENAI_API_KEY);
  console.log('API Key length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in environment variables');
    console.log('Please create a .env file in the backend directory with:');
    console.log('OPENAI_API_KEY=your_actual_api_key_here');
    return;
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('Making test API call...');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Say hello in one word" }
      ],
      max_tokens: 10
    });

    console.log('✅ OpenAI API is working!');
    console.log('Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);
    if (error.code === 'insufficient_quota') {
      console.log('💡 Your OpenAI account has exceeded its quota. Please:');
      console.log('1. Check your billing information at https://platform.openai.com/account/billing');
      console.log('2. Add payment method if needed');
      console.log('3. Check your usage limits');
    }
  }
}

testOpenAI();

