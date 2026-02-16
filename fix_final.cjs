const fs = require('fs');
const filePath = 'd:/Autonex Tools/New folder/Tracker/Tracker/dashboard/src/App.tsx';

let text = fs.readFileSync(filePath, 'utf-8');

// Fix em-dashes (â€")
// This is likely the result of E2 80 94 interpreted as Windows-1252
text = text.replace(/â€"/g, '—');

// Fix empty No Data icon
// Found: <div className="text-3xl mb-2 opacity-40"></div>
// Replace with: <div className="text-3xl mb-2 opacity-40"><Icons.Search /></div>
text = text.replace(
    /<div className="text-3xl mb-2 opacity-40"><\/div>/g,
    '<div className="text-3xl mb-2 opacity-40"><Icons.Search /></div>'
);

// Just in case, check for any other common double-encoding artifacts
// â€™ -> '
text = text.replace(/â€™/g, "'");

fs.writeFileSync(filePath, text, 'utf-8');
console.log('Final polish applied: Fixed em-dashes and added missing empty-state icon.');
