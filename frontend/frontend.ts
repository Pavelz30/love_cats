import * as express from "express";
import * as path from "path";
import fetch from "node-fetch"; // Импортируем node-fetch


const app = express();
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

const port: number = 3000;
const backendUrl = "http://backend:3001";

app.get('/', async (req, res) => {
 //   const cat_data = await fetch(`${backendUrl}/cat_get`);
 // const data = await cat_data.text();
try {
        const cat_data = await fetch(`${backendUrl}/cat_get`);
        const data = await cat_data.text();
        res.render('index.jade', { title: "KIT Frontend", cat_url: data });
    } catch (error) {                                                                                                                                               console.error('Error fetching cat data:', error);
        res.status(500).send('Error fetching cat data');
    }   
   // res.render('index.jade', { title: "KIT Frontend", cat_url: data });
});

app.listen(port, () => {
    console.log(`Frontend app listening on port ${port}`)
})
