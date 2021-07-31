
let _db = [];

module.exports = {

    add( todo ){

        const _id = Date.now();

        todo.id = _id;

        _db.unshift( todo );

        return _id;
    },

    get( id ){
        for( let todo of _db ){
            if( todo.id == id ) return todo;
        }

        return null;
    },

    getAll(){
        // return a copy
        return _db.slice(0);
    },

    update( id, newTodo ){

        newTodo.id = id;

        _db = _db.map( todo => todo.id == id ? newTodo : todo );

        return id;
    },

    delete(id){
        _db = _db.filter( todo => todo.id != id );
    }
};