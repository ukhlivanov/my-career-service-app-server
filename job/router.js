'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Job} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res)=>{

    const requiredFields = ['id', 'title', 'type', 'location', 'company', 'created_at'];
    const missingField = requiredFields.find(field => !(field in req.body));
  
    console.log(req.body)

    if (missingField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
      });
    }

    return Job.create({
        id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        location: req.body.location,
        company: req.body.company,
        created_at: req.body.created_at
    }).then(job => {
        return res.status(201).json(job.serialize());
    }).catch(err => {

        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
      });
});

router.get('/', (req, res) =>{
  return Job.find()
  .then(jobs => res.json(jobs.map(job => job.serialize())))
  .catch(error => res.status(500).json({message:'Internal server error'}))
})

module.exports = {router};