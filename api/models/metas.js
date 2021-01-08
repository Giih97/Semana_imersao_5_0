const mongoose = require('mongoose');
const { Schema } = mongoose;

const meta = new Schema ({
    name: {
        type:String

    },
    description: {
        type:String
    },
    status: {
        type:String
    }
},{
        timestamps:true

});

/*const schema = new mongoose.Schema({name: 'string', size: 'string'});
const Tank = mongoose.model('metas',schema); */

mongoose.model('Meta',meta);
