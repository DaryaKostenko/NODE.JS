import { reversString } from './../utils/string-revers';

process.stdout.write('Please, type something\n');

process.stdin.setEncoding('utf-8');
process.stdin.on('data', data => process.stdout.write(`${reversString(data)}\n\n`));