
const express = require('express');

const etcApp = express.Router();

// not application wide
etcApp.use(function( req,res,next ){
    console.log( 'trying to access ETC endpoint : ' , new Date() );
    next();
})

// get all
etcApp.get( '/is-alive' , function(req,res){
    res.send('Yes I am alive')
} );

module.exports = etcApp;
