const port = process.env.PORT || 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const cors = require('cors');
app.use(cors());

const websiteConfigs = [
    {
        url: 'https://timesofindia.indiatimes.com/explainers',
        headlineSelector: 'h5 ',
        hasAriaLabel:false
    },
    {
        url: 'https://www.thehindu.com/opinion/',
        headlineSelector: '.element h3.title strong ',
        hasAriaLabel:false
    }
    
];

app.get('/', function (req, res) {
    res.json("This is my news aggregator");
});

app.get('/news', async function (req, res) {
    const headlines = [];

    try {
        await Promise.all(websiteConfigs.map(async (config) => {
            const response = await axios(config.url);
            const html = response.data;
            const $ = cheerio.load(html);

            $(config.headlineSelector).each(function () {
                
                const label = config.hasAriaLabel ? $(this).attr('aria-label') :  $(this).text().trim();
                const url = $(this).find('a').attr('href');
                

                headlines.push({
                    label,
                    url,
                    source: config.url // Store the source URL
                });
            });
        }));

        res.json(headlines);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching news data.' });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));


