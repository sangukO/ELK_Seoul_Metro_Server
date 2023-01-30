const express = require('express');
const app = express();
const client = require('./module/connection');
const db_config = require('./module/database');
const conn = db_config.init();

db_config.connect(conn);

app.get('/api/mysql', async (req, res) => {
    var sql = 'SELECT timestamp, station_code from `seoul-metro-log` where people_in = '+req.query.pin+' and people_out = '+req.query.pout;
    conn.query(sql, (error, rows, fields) => {
      if (error) throw error;
      console.log('User info is: ', rows);
      res.send({list : rows});
    });
})

app.get('/api/f', async (req, res) => {

    const result = await client.search({
        index: 'seoul-metro-station-info',
        query: {
            match : { "station.code" : req.query.query }
        }
    });
    res.send(result.hits.hits);
})

app.get('/api/s', async (req, res) => {
    const result = await client.search({
        query: {
            match : { "station.name" : req.query.query }
        },
        size: 0,
        index: 'seoul-metro-logs-*',
        aggs: {
            ENT_people_in: {
              sum: {
                field: "people_in"
              }
            },
            ENT_people_out: {
                sum: {
                    field: "people_out"
                }
            }
          }
    });
    console.log(result.aggregations);
    res.send(result.aggregations);
})

app.get('/api/t', async (req, res) => {

    const result = await client.search({
        index: 'seoul-metro-station-info',
        query: {
            match : { "station.name" : req.query.query }
        }
    });
    res.send(result.hits.hits);
})

app.get('/api/es', async (req, res) => {
    const result = await client.search({
        query: {
            bool: {
              must: [
                {
                    match: {
                        "people_in": req.query.pin
                    }
                },
                {
                    match: {
                        "people_out": req.query.pout
                    }
                }
              ]
            }
        },
        index: 'seoul-metro-logs-*'
    });
    console.log(result);
    res.send(result);
})

app.listen(4000);