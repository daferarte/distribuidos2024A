const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = 3000;
        this.userpath = '/api/users';
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.userpath, require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;