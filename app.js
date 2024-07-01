import axios from 'axios';
import express from 'express';
const app = express();
const port = 3000;

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const dir = dirname(fileURLToPath(import.meta.url));
app.use(express.static("./public"));

import body from 'body-parser';
app.use(body.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/generate', async (req, res) => {
    try {
        const base = req.body['base'];
        const target = req.body['target'];
        const value = req.body['currency-value'];
        if (base && target && value && value > -1) {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/21d9bfab0909f1cbd6de22eb/pair/${base}/${target}`)
            const result = response.data;
            console.log(result)
            res.render('index.ejs', { data: result, value: value, target: req.body['target'] });
        }
        res.render('index.ejs', { data: 1 });
    } catch (error) {
        res.render('index.ejs', { err: error });
        console.log(error.result);
    }

});
app.listen(port, () => {
    console.log(`server is up and running!`);
})
