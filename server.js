const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TOKEN_URL = 'https://login.usw2.pure.cloud/oauth/token';
const CLIENT_ID = 'a253b1c9-fc33-4316-b3eb-860dc714d8a0';
const CLIENT_SECRET = 'Z_HyOG2UuBn2ZHebj7X8OimSAyRmjenshS8e8ZEPuzU';

// Create an httpsAgent with rejectUnauthorized set to false
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.post('/api/token', async (req, res) => {
    try {
        const response = await axios.post(TOKEN_URL, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            },
            httpsAgent // Pass the httpsAgent here
        });
        res.json({ access_token: response.data.access_token });
    } catch (error) {
        console.error('Error retrieving token:', error);
        res.status(500).json({ error: 'Failed to retrieve token' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
