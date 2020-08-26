const csv = require('csvtojson');
const fs = require('fs');

const inputFile = './sources/input.csv';
const outputFile = './sources/output.txt';

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

readStream
    .on('error', (error) => console.error(`Reading csv error\n${error.message}`))
    .pipe(csv())
    .on('error', (error) => console.error(`Converting csv to txt error\n${error.message}`))
    .pipe(writeStream)
    .on('error', (error) => console.error(`Writing to txt error\n${error.message}`))
    .on('finish', () => console.log('Converting has been compleated. Take a look at your new file.'));