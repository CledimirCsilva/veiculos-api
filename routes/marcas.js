const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { response } = require('express')

require('../models/marcas')
const Brand =  mongoose.model('marcas')

router.get('/', (req, res) => {

    const getAllBrands = () => {
        
        const callback = (resolve, reject) => {
            Brand.find().lean().then( (result) => {
                res.status(200)
                res.json(result)
            } )
            resolve()
            
            reject('Houve um erro')
        }
        return new Promise(callback)
    }

    const runAsyncGetAllBrands = async () => {
        try {
            await getAllBrands()
        }catch(err) {console.error(err)}
    }

    runAsyncGetAllBrands()
})

router.get('/:id', (req, res) => {

    const getOneBrand = () => {
        const callback = (resolve, reject) => {
            Brand.findOne({_id: req.params.id}).lean().then((result) => {
                res.status(200)
                res.json(result)
            })
            resolve()
            reject('Houve um erro')
        }
        return new Promise(callback)
    }

    const runAsyncGetOneBrand = async() => {
        try {
            await getOneBrand()
        }catch(err) {console.error(err)}
        
    }
    runAsyncGetOneBrand()
})

router.post('/', (req, res) => {

    const createAbrand = () => {
        const callback = (resolve, reject) => {
            const brand = { name: req.body.name }
            new Brand(brand).save().then( (result) => {
                res.status(201)
                res.json(result)
            })
            resolve()
            reject('Houve um erro ao inserir o registro.')
        }

        return new Promise(callback)
    }

    const runAsyncCreateAbrand = async () => {
        try{
            await createAbrand()
        }catch(err) {console.error(err)}
        
    }
    runAsyncCreateAbrand()
})

router.patch('/update/:id', (req, res) => {

    const updateDataBrand = () => {
        const callback = (resolve, reject) => {
            if(req.body.name) {
                let brand = { $set: { name: req.body.name } }
                Brand.updateOne({ _id: req.params.id }, brand, (err, doc) => {
                    if(err) {
                        res.status(500)
                    }
                    res.status(201)
                    res.json(doc)
                    resolve()
                    reject('Houve um erro')
                })
            }
            return new Promise(callback)
        }

        const runAsyncUpdateDataBrand = async() => {
            try {
                await updateDataBrand()
            }catch(err) {console.error(err)}
        }
        runAsyncUpdateDataBrand()
    }

    const updateDataBrand = () => {
        if(req.body.name) {
            var brand = { $set: { name: req.body.name } }
            
            Brand.updateOne({_id: req.params.id}, brand, (err, doc) => {
                if(err) {
                    res.status(500)
                }
                res.status(201)
                res.json(doc)
            })
        }
    }
    updateDataBrand()
})

router.delete('/:id', (req, res) => {

    const delOneBrand = () => {
        Brand.deleteOne({_id: req.params.id})
        .then( (result) => {
            res.status(201)
            res.json(result)
        })
        .catch( (err) => {
            res.status(500) }
        )
    }
    delOneBrand()
})

module.exports = router
