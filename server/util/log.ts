import * as fs from "node:fs";

const colors = {
    'INFO': '\x1b[32m',
    'WARN': '\x1b[33m',
    'ERROR': '\x1b[31m',
    'RESET': '\x1b[0m',
};

export function log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${colors[level]}${level}${colors['RESET']}] ${message}`);
    fs.appendFileSync('server.log', `[${timestamp}] [${level}] ${message}\n`);
}