
const express = require('express');

const app = express();

app.use( express.json() );
app.use( express.urlencoded({extended:false}) );

// integrate application wide policies
require('./src/policies/apikey')(app);

const todoApp = require('./src/controllers/todos/todos');

// integrate the todo mini app
app.use('/todos',todoApp);

const etcApp = require('./src/controllers/etcs/etcs');

// integrate the etc mini app
app.use('/etcs',etcApp);

app.listen(8001,()=>{
    console.log('listening has started.');
});