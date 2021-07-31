
const express = require('express');

const todoApp = express.Router();

const todoModel = require('../../models/todos/todos');

const validator = require('../../helpers/validator');

const env = require('../../config/env');

// not application wide
todoApp.use(function( req,res,next ){
    console.log( 'You are accessing todo endpoint : ' , new Date() );
    next();
})

// get all
todoApp.get( '/' , function(req,res){
    res.send( todoModel.getAll() );
} );

// get one
todoApp.get( '/:id' , function(req,res){

    const id = req.params.id ;

    const dataValid = validator.validateForRequest('int',id,req,res);

    if(dataValid){

        const todo = todoModel.get( id );

        // if todo not found
        if(!todo){
            res.status(404).end();
            return;
        }

        res.send( todo );
    }
} );

todoApp.post( '/' , function(req,res){

    const { name , type , budget , description , progress } = req.body;

    const dataValid = 
    
    // validate name
    validator.validateForRequest('required',name,req,res) 
    
    // validate type
    validator.validateForRequest('enum',type,req,res,{
        enum:env.todos.types
    }) 
    
    // validate decimal
    && validator.validateForRequest('decimal',budget,req,res) 
    
    // validate progress
    && validator.validateForRequest('int',progress,req,res);

    if(dataValid){
        const _id = todoModel.add( {
            name,
            type,
            budget,
            description,
            progress
        } );

        // return the data as it is in database
        res.send( todoModel.get( _id ) );
    }
} );

todoApp.delete( '/:id' , function(req,res){
    
    const id = req.params.id ;

    const dataValid = validator.validateForRequest('int',id,req,res);

    if(dataValid){

        todoModel.delete( id );

        res.status( 200 ).end();
    }
} );

todoApp.put( '/:id' , function(req,res){

    const { name , type , budget , description , progress } = req.body;

    const id = req.params.id;

    const dataValid = 
    
    // validate name
    validator.validateForRequest('int',id,req,res) 

    // validate name
    && validator.validateForRequest('required',name,req,res) 
    
    // validate type
    && validator.validateForRequest('enum',type,req,res,{
        enum:env.todos.types
    }) 
    
    // validate decimal
    && validator.validateForRequest('decimal',budget,req,res) 
    
    // validate progress
    && validator.validateForRequest('int',progress,req,res);

    if(dataValid){
        todoModel.update( id, {
            name,
            type,
            budget,
            description,
            progress
        } );

        // return the data as it is in database
        res.send( todoModel.get( id ) );
    }
} );

module.exports = todoApp;
