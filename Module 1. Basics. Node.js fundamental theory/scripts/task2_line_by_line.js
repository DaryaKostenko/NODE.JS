const csv = require('csvtojson');
const fs = require('fs');

const inputFile = './sources/input.csv';
const outputFile = './sources/output.txt';

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

csv()
.fromStream(readStream)
.subscribe((json) => {
	writeStream.write(`${JSON.stringify(json)}\n`);
});

readStream.on('error', (error) => console.error(`Reading csv error\n${error.message}`));
writeStream.on('error', (error) => console.error(`Writing to txt error\n${error.message}`))