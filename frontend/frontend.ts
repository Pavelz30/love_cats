import * as express from 'express';
import * as path from 'path';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as http from 'http';
import * as net from 'net';

const app = express();
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

const backendSocketPath = '/tmp/flask.sock';

//
// Функция отправляющая http запрос через сокет, пробовал через библиотки http-socket-agent, http-unix-socket, fs и http
// Не получилось, в итоге пришлось искать костыль такой... буду рад, если подскажешь, как можно было по-другому)
//

function fetchFromUnixSocket(socketPath: string, endpoint: string): Promise<string> { 
    return new Promise((resolve, reject) => {
        const options = {
            socketPath: socketPath,
            path: endpoint,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}

//
//
//

app.get('/', async (req, res) => {
    try {
        const data = await fetchFromUnixSocket(backendSocketPath, '/cat_get');
        res.render('index.jade', { title: 'KIT Frontend', cat_url: data });
        console.log('data:', data);
    } catch (error) {
        console.error('Error fetching cat data:', error);
        res.status(500).send('Error fetching cat data');
    }
});

const frontendSocketPath = '/tmp/express.sock';
if (fs.existsSync(frontendSocketPath)) {
    fs.unlinkSync(frontendSocketPath);
}

app.listen(frontendSocketPath, () => {
    console.log(`Frontend app listening on Unix socket ${frontendSocketPath}`);
});

