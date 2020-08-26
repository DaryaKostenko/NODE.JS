import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';

const inputFile = './sources/input.csv';
const outputFile = './sources/output.txt';

const readStream = createReadStream(inputFile);
const writeStream = createWriteStream(outputFile);

readStream
    .on('error', (error) => console.error(`Reading csv error\n${error.message}`))
    .pipe(csv())
    .on('error', (error) => console.error(`Converting csv to txt error\n${error.message}`))
    .pipe(writeStream)
    .on('error', (error) => console.error(`Writing to txt error\n${error.message}`))
    .on('finish', () => console.log('Converting has been compleated. Take a look at your new file.'));