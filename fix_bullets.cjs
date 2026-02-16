const fs = require('fs');
const filePath = 'd:/Autonex Tools/New folder/Tracker/Tracker/dashboard/src/App.tsx';

let text = fs.readFileSync(filePath, 'utf-8');

// Replace garbled bullet points in password placeholders
// The specific string seen was likely "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
// We'll replace any sequence of â€¢ inside a placeholder with dot bullets
text = text.replace(/placeholder="â€¢+"/g, 'placeholder="••••••••"');

// Just in case, replace individual occurrences globally if safe
// â€¢ maps to •
text = text.replace(/â€¢/g, '•');

// Also catch ellipses â€¦ -> … (U+2026) -> UTF-8 E2 80 A6 -> â€¦
text = text.replace(/â€¦/g, '...');

// And single quotes â€™ -> ’ (U+2019) -> UTF-8 E2 80 99 -> â€™
text = text.replace(/â€™/g, "'");

fs.writeFileSync(filePath, text, 'utf-8');
console.log('Fixed bullet points and common punctuation artifacts.');
