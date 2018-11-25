const express = require('express');
const router = express.Router();

const Item = require('../model/shoppingItem');

//retriving data from db
router.get('/items', (req, res, next)=>{
    Item.find(function(err, items){
        if(err){
            res.json(err);
        }
        else{
            res.json(items);
        }
    });
});

//insert data 
router.post('/item', (req, res, next)=>{
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });
    newShoppingItem.save((err, item)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json({msg: 'Item has been added successfully'});
        }
    });
});

//update data
router.put('/item/:id', (req, res, next)=>{
    Item.findOneAndUpdate({_id: req.params.id}, {
        $set:{
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    },
    function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

//delete data
router.delete('/item/:id',(req, res, next)=>{
    Item.deleteOne({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});

module.exports = router;