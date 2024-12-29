import * as https from 'https';
import { URLSearchParams } from 'url';

const hostname = 'adventofcode.com';
const inputEndpoint = (year, day) => `/${year}/day/${day}/input`;
const answerEndpoint = (year, day) => `/${year}/day/${day}/answer`;

export class AdventClient {
    constructor(year, day) {
        this.year = year;
        this.day = day;
        this.hostname = hostname;
    }

    input() {
        const options = {
            hostname: this.hostname,
            port: 443,
            path: inputEndpoint(this.year, this.day),
            rejectUnauthorized: false,
            headers: {
                'Cookie': `session=${process.env.SESSION}`,
                'Content-Type': 'text/plain',
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.get(options, (res) => {
                let plainData = '';

                res.on('data', (chunk) => {
                    plainData += chunk;
                });

                res.on('end', () => resolve(plainData));
            });

            req.on('error', (e) => reject(e));
            req.end();
        });
    }

    answer(solution) {
        const params = new URLSearchParams();
        params.append('level', this.day);
        params.append('answer', solution);

        const options = {
            hostname: this.hostname,
            port: 443,
            path: answerEndpoint(this.year, this.day),
            method: 'POST',
            rejectUnauthorized: false,
            headers: {
                'Cookie': `session=${process.env.SESSION}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(params.toString())
            }
        }

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let plainData = '';

                res.on('data', (chunk) => {
                    plainData += chunk;
                });

                res.on('end', () => resolve(plainData));
            });

            req.on('error', (e) => reject(e));

            req.write(params.toString());
            req.end();
        });
    }
}

