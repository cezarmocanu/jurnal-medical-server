const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const {port, sync} = require('./config.dev');
const {connection} = require('./db');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
routes(app);

app.listen(port,async () => {
    try {
        await connection.authenticate();
        if (sync) {
            await connection.sync({force:true})
        }
        console.log(`Listening on port ${port}`);
    }
    catch(error) {
        throw new Error(`Could not connect to Database \n ${error}`);
    }
    
});