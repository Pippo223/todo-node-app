
const env = require('../config/env')

module.exports = function(app){

    app.use( function(req,res,next){

        const authLine = req.headers['authorization'];

        if( !req.url.startsWith('/etcs') && ( !authLine || authLine.split(' ')[1] != env.apikey ) ){
            console.log('invalid auth key');
            res.status(400).end();
            return;
        }

        next();
    } );
}