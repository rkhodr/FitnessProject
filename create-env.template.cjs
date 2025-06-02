const fs = require('fs');
const path = require('path');

const envContent = 'ANTHROPIC_API_KEY=your_api_key_here';
fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('.env file created successfully'); 