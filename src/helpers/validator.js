
module.exports = {

    validateForRequest( type , datium , req , res , extra = {} ){

        let valid = false;

        switch( type ){
            case 'required':
                valid = typeof datium !== 'string' || !!datium;
                break;
            case 'int':
                valid = !isNaN( parseInt( datium ) );
                break;
            case 'decimal':
                valid = !isNaN( parseInt( datium ) );
                break;
            case 'enum':
                valid = Array.isArray( extra.enum ) && extra.enum.includes( datium );
                break;
        }

        if( !valid ){
            res.status(400)
            res.end();
            return false;
        }

        return true;
    },
};