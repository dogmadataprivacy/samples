'use strict'

const express = require('express')
const { Validator, ValidationError } = require('express-json-validator-middleware')

const PORT = 8080
const HOST = '0.0.0.0'
const validator = new Validator({allErrors: true})
const validate  = validator.validate

const schema = {
    type       : 'object',
    required   : ['version', 'source', 'protocol', 'scope', 'keys'],
    properties : {
        version  : { description: "", type: 'string', enum: ['v1'] }             ,
        source   : { description: "", type: 'string' }                           ,
        protocol : { description: "", type: 'string' }                           ,
        scope    : { description: "", type: 'string', enum: ['SAR', 'DDR'] }     ,
        keys     : { description: "", type: 'object' }                           ,
        fields   : { description: "", type: 'array', items: { type: "string" } } ,
    }
}

const app = express()
app.use(express.json())

const notFound = it => {
    return {
        source   : it.source,
        protocol : it.protocol,
        scope    : it.scope,
        kind     : 'NOT_FOUND',
    }
}

const found = it => {
    const result =  {
        source   : it.source,
        protocol : it.protocol,
        scope    : it.scope,
        kind     : 'SUCCESS',
    }

    if(it.scope === "SAR") {
        return { 
            ...result, 
            data: {
                name: 'Leandro', lastname: 'Cruz', phone: '+5541 000 000 000'
            } 
        }
    } else {
        return result
    }
}

const failure = it => {
    return {
        source   : it.source,
        protocol : it.protocol,
        scope    : it.scope,
        kind     : 'FAILURE',
        data     : { message: "Some Error Message" }
    }
}

app.post('/dogma/v1', validate({body: schema}), (req, res) => {
    //console.dir(req.body)
    switch(req.body.keys.id) {
        case 0  : return res.json(notFound(req.body))
        case 1  : return res.json(found   (req.body))
        case 2  : return res.status(202).send()
        default : return res.json(failure (req.body))
    }
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

