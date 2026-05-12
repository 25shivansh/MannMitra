require('dotenv').config();

console.log('=== OpenAI API Key Debug ===');
console.log('Key present:', !!process.env.OPENAI_API_KEY);
console.log('Key length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);

if (process.env.OPENAI_API_KEY) {
  const key = process.env.OPENAI_API_KEY;
  console.log('Key starts with:', key.substring(0, 10) + '...');
  console.log('Key ends with:', '...' + key.substring(key.length - 10));
  console.log('Contains spaces:', key.includes(' '));
  console.log('Contains newlines:', key.includes('\n'));
  console.log('Contains tabs:', key.includes('\t'));
  
  // Check if it looks like a valid OpenAI key
  if (key.startsWith('sk-')) {
    console.log('✅ Key format looks correct (starts with sk-)');
  } else {
    console.log('❌ Key format is wrong (should start with sk-)');
  }
  
  if (key.length >= 50) {
    console.log('✅ Key length looks reasonable');
  } else {
    console.log('❌ Key might be too short');
  }
} else {
  console.log('❌ No API key found in environment variables');
}

