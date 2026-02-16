const fs = require('fs');
const filePath = 'd:/Autonex Tools/New folder/Tracker/Tracker/dashboard/src/App.tsx';

let text = fs.readFileSync(filePath, 'utf-8');

// Fix all double-encoded UTF-8 characters
// The pattern is: UTF-8 bytes were interpreted as Windows-1252, then re-encoded to UTF-8
// We need to: take each character, if it's in the Latin-1 supplement range, 
// collect sequences and try to decode them as UTF-8 bytes

function fixDoubleEncoding(str) {
    let result = '';
    let i = 0;
    while (i < str.length) {
        const code = str.charCodeAt(i);

        // Check if this looks like a double-encoded sequence
        // Windows-1252 chars mapped from UTF-8 bytes: 0xC0-0xFF range
        if (code >= 0xC0 && code <= 0xFF) {
            // Collect consecutive high bytes
            const bytes = [];
            let j = i;
            while (j < str.length) {
                const c = str.charCodeAt(j);
                // Windows-1252 special mappings (0x80-0x9F range maps to specific Unicode points)
                const win1252Map = {
                    0x2026: 0x85, // ellipsis
                    0x2013: 0x96, // en-dash
                    0x2014: 0x97, // em-dash  
                    0x2018: 0x91, // left single quote
                    0x2019: 0x92, // right single quote
                    0x201C: 0x93, // left double quote
                    0x201D: 0x94, // right double quote
                    0x2022: 0x95, // bullet
                    0x0160: 0x8A, // S-caron
                    0x0161: 0x9A, // s-caron
                    0x0178: 0x9F, // Y-diaeresis
                    0x02DC: 0x98, // small tilde
                    0x02C6: 0x88, // modifier circumflex
                    0x2039: 0x8B, // single left angle quote
                    0x203A: 0x9B, // single right angle quote
                    0x2030: 0x89, // per mille
                    0x0152: 0x8C, // OE ligature
                    0x0153: 0x9C, // oe ligature
                    0x017D: 0x8E, // Z-caron
                    0x017E: 0x9E, // z-caron
                    0x0192: 0x83, // f with hook
                    0x02C6: 0x88, // circumflex
                    0x2020: 0x86, // dagger
                    0x2021: 0x87, // double dagger
                    0x2122: 0x99, // trademark
                };

                let byteVal;
                if (c >= 0x80 && c <= 0xFF) {
                    byteVal = c; // Direct Latin-1
                } else if (win1252Map[c] !== undefined) {
                    byteVal = win1252Map[c]; // Windows-1252 special mapping
                } else {
                    break; // Not part of the double-encoded sequence
                }
                bytes.push(byteVal);
                j++;
            }

            if (bytes.length >= 2) {
                // Try to decode these bytes as UTF-8
                try {
                    const buf = Buffer.from(bytes);
                    const decoded = buf.toString('utf-8');
                    // Check if we got valid characters (not replacement chars)
                    if (!decoded.includes('\uFFFD') && decoded.length > 0) {
                        result += decoded;
                        i = j;
                        continue;
                    }
                } catch (e) {
                    // Fall through
                }
            }
        }

        // Also handle the Windows-1252 special range directly for single chars
        // â€" = 0xE2 0x80 0x94 = em-dash when properly decoded
        // But if it's already showing as individual garbled chars, we need the sequence approach above

        result += str[i];
        i++;
    }
    return result;
}

const fixed = fixDoubleEncoding(text);

// Verify the fix worked
const emDashCount = (fixed.match(/\u2014/g) || []).length;
const boxDrawCount = (fixed.match(/[\u2550-\u256C]/g) || []).length;
console.log('After fix - em-dashes:', emDashCount, 'box-drawing chars:', boxDrawCount);

// Check remaining garbled chars
let remaining = 0;
for (let i = 0; i < fixed.length; i++) {
    const code = fixed.charCodeAt(i);
    if (code >= 0x80 && code <= 0xFF) remaining++;
}
console.log('Remaining Latin-1 supplement chars:', remaining);

// Now replace any remaining emojis with simple alternatives
let output = fixed;

// Replace em-dashes with simple dashes for consistency
output = output.replace(/\u2014/g, '-');

// Replace box-drawing characters in comments with simple equals
output = output.replace(/[\u2550-\u256C]+/g, '===');

// Find and replace any remaining garbled emoji-like sequences 
// The emojis like 📭 (U+1F4AD = mailbox closed) in "no data found" areas
// These are 4-byte UTF-8 sequences that might be garbled
const lines = output.split('\n');
for (let i = 0; i < lines.length; i++) {
    // Replace any remaining non-BMP characters (emoji) with empty string
    // Emojis are in the supplementary planes (U+10000+)
    lines[i] = lines[i].replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');

    // Fix specific garbled text patterns
    lines[i] = lines[i].replace(/ðŸ.{1,3}/g, ''); // catch remaining garbled emoji
}
output = lines.join('\n');

// Also find lines with opacity-40 that render garbled emoji text
// Replace the content of such divs with empty string
output = output.replace(/"text-3xl mb-2 opacity-40">[^<]*</g, '"text-3xl mb-2 opacity-40"><');

fs.writeFileSync(filePath, output, 'utf-8');
console.log('Comprehensive encoding fix complete!');
console.log('File size:', output.length, 'chars');

// Final verification
const finalText = fs.readFileSync(filePath, 'utf-8');
let finalIssues = 0;
for (let i = 0; i < finalText.length; i++) {
    const code = finalText.charCodeAt(i);
    if (code >= 0x80 && code <= 0xFF) finalIssues++;
}
console.log('Final Latin-1 supplement chars remaining:', finalIssues);
