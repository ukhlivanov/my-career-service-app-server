'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const JobSchema = mongoose.Schema({
    id:{type: String, require: true},
    title: {type: String, require: true},
    type: {type: String, require: true},
    location:{type: String, require: true},
    company: {type: String, require: true},
    created_at: {type: Date, require: true}
})

JobSchema.methods.serialize = function(){
    return {
        id: this.id || '',
        title: this.title || '',
        type: this.type || '',
        location: this.location || '',
        company: this.company || '',
        created_at: this.created_at || '',
    }
}

const Job = mongoose.model('Job', JobSchema);
module.exports = {Job}