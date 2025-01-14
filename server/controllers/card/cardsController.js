const express = require('express');
const Card = require('../../models/card');

function list(req, res, next) {
    let query = Card.find({});
    query.exec((err,resp) =>{
        if (err){
            res.status(500).json({
                message: res.__('error'),
                error: true,
                objs: err
            });
        }
        res.status(200).json({
            message: res.__('ok'),
            error:false,
            data: resp
        });
    });
}

function index(req, res, next){
    let id = req.params.id;
    let query = Card.findOne({_cardId: id});
    query.exec((err,resp) =>{
        if (err){
            res.status(500).json({
                message: res.__('error'),
                error: true,
                objs: err
            });
        }
        res.status(200).json({
            message: res.__('ok'),
            error:false,
            data: resp
        });
    });
}

function create(req, res, next){

    let cardId = req.body.cardId;
    let sprintId = req.body.sprintId;
    let projectId = req.body.projectId;
    let cardPriority = req.body.cardPriority;
    let cardName = req.body.cardName;
    let role = req.body.role;
    let feature = req.body.feature;
    let benefict = req.body.benefict;
    let context = req.body.context;
    let status = req.body.status;
    let events = req.body.events;
    let results = req.body.results;

    let card = new Card({
        _cardId: cardId,
        _sprintId:sprintId,
        _projectId:projectId,
        _cardPriority:cardPriority,
        _cardName:cardName,
        _role:role,
        _feature:feature,
        _benefict:benefict,
        _status: status,
        _events: events,
        _context:context,
        _results:results
    });  
    card.save()
    .then((obj)=>{
        res.status(200).json({
            message: res.__('ok'),
            error: false,
            objs: obj
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message: res.__('error'),
            error: true,
            objs: err
        });
    });
}

function update(req,res,next){
    console.log("Entro");
    
    let id = req.params.id;
    Card.findOne({_cardId: id},(err,obj) =>{
        if (err){}
        else{
            obj._sprintId = (req.body._sprintId) ? req.body._sprintId : obj._sprintId;
            obj._cardPriority = (req.body._cardPriority) ? req.body._cardPriority : obj._cardPriority;
            obj._cardName = (req.body._cardName) ? req.body._cardName : obj._cardName;
            obj._role = (req.body._role) ? req.body._role : obj._role;
            obj._feature = (req.body._feature) ? req.body._feature : obj._feature;
            obj._benefict = (req.body._benefict) ? req.body._benefict : obj._benefict;
            obj._context = (req.body._context) ? req.body._context : obj._context;
            obj._status = (req.body._status) ? req.body._status : obj._status;
            //Si es arreglo lo mas natural es pushearle al arreglo
            if (Array.isArray(req.body.event)){
                req.body.event.forEach(element => {
                    obj._events.push(element);
                });
            }
            //Si no es arreglo, es tratado como un numero y si de plano no viene, no pasa nada
            else if (req.body.event){ 
                obj._events.push(req.body.event)
            }
            if (Array.isArray(req.body.result)){
                req.body.result.forEach(element => {
                    obj._results.push(element);
                });
            }
            else if (req.body.result){ 
                obj._results.push(req.body.result)
            }
            obj.save()
            .then(o =>{
                res.status(200).json({
                    message: res.__('ok'),
                    error: false,
                    objs: o
                });
            })
            .catch(err =>{
                res.status(500).json({
                    message: res.__('error'),
                    error: true,
                    objs: err
                });
            });
        }
    });
}

function destroy(req,res,next){
    let id = req.params.id;
    Card.findOneAndDelete({_cardId : id},(err,resp) =>{
        if(err){
            res.status(500).json({
                message: res.__('error'),
                error: true,
                objs: err
            });
        }else{
            res.status(200).json({
                message: res.__('ok'),
                error: false,
                data: resp
            });
        }
    });
}

module.exports = {
    list,index,create,update,destroy
}