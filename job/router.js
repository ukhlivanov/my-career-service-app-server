'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Job} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const fetch = require("node-fetch");

router.post('/', jsonParser, (req, res)=>{
    const requiredFields = ['id', 'title', 'type', 'location', 'company', 'created_at','url', 'username'];
    const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
      });
    }

    Job.create({
        id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        location: req.body.location,
        company: req.body.company,
        created_at: req.body.created_at,
        url: req.body.url,
        username: req.body.username
    })
    // .then(job => {
    //     return res.status(201).json(job.serialize());
    // })
    .then(job => res.status(201).json(job.serialize()))
    .catch(err => {

        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
      });
});



router.post('/sync', jsonParser, (req, res) =>{
  console.log(req.body.username)
  Job.find({username: req.body.username})
  .then(jobs => res.json(jobs.map(job => job.serialize())))
  .catch(error => res.status(500).json(error))
})

router.post('/github', jsonParser, (req, res) =>{
  fetch(`https://jobs.github.com/positions.json?description=${req.body.jobtitle}&full_time=false&location=${req.body.location}&page=1`)
  .then(res => res.json())
  .then(json => res.json(json))
  .catch(error => res.status(500).json(error))
})


router.get('/', jsonParser, (req, res) =>{
  console.log(req.body)
  Job.find()
  .then(jobs => res.json(jobs.map(job => job.serialize())))
  .catch(error => res.status(500).json(error))
})

router.delete('/', jsonParser, (req, res) => {
  Job
    .deleteOne({id: req.body.id})
    .then(() => {
      console.log('made it here')
      res.status(201).json({
        message: 'success'
      });
      console.log(res.statusCode)
    }
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'something went terribly wrong'
      });
    });
});

module.exports = {router};