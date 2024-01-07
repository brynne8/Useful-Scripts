const fs = require('fs');
const path = require('path');

function replaceUnicode(match) {
    return String.fromCharCode(parseInt(match.substring(2), 16));
}

function processLine(line) {
    if (line.startsWith('#')) {
        return line.replace(/\\u[\dA-F]{4}/gi, replaceUnicode);
    }
    return line;
}

function processFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const processedLines = lines.map(processLine);
    const newContent = processedLines.join('\n');
    return newContent;
}

function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Please specify a file path.');
        return;
    }
    const filePath = args[0];
    const newFilePath = path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + '.out');

    try {
        const processedContent = processFile(filePath);
        fs.writeFileSync(newFilePath, processedContent, 'utf8');
        console.log(`Processed file written to: ${newFilePath}`);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

main();
