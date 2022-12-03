const express = require('express');
const car_inv = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

car_inv.use(cors());
car_inv.use(express.json());
car_inv.use(express.urlencoded({ extended : false }));

// read
car_inv.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
})

car_inv.listen(process.env.PORT, () => console.log('car_inv is running'));