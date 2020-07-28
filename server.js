const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./config/db');

//Connect DB
connectDB();


//Init middleware.
app.use(express.json({
    extended: false
}));

const PORT = process.env.PORT || 5000;

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    } )
}

app.listen(PORT,() => console.log(`Running on Port ${PORT}`));

