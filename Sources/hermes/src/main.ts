import express from 'express';
import * as http from 'http';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors'

import classroomRouter from './routes/classroom';
import quizzRouter from './routes/quizz';
import usersRouter  from './routes/user';
import tourRouter from './routes/tour';
import stepRouter from './routes/step';
import testRouter from './routes/test';
import poiRouter from './routes/poi';


// Local Database configuration
mongoose.connect("mongodb://localhost/database", { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to db');
});


//Remote Database configuration
// mongoose.connect("mongodb+srv://admin4412:PLDSmart12@cluster0-aye5s.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('Connected to db');
// });


let app: express.Application = express();

// Handle log and body parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Handle CORS
app.use(cors());

// Route definition
app.use('/classroom', classroomRouter);
app.use('/quizz', quizzRouter);
app.use('/user', usersRouter);
app.use('/tour', tourRouter);
app.use('/step', stepRouter);
app.use('/test', testRouter);
app.use('/poi', poiRouter);

// TODO: Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// Error handler
app.use((err, req, res, next)  => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    //res.render('error'); TODO TRY TO HANDLE ERROR
});

// Create HTTP server and listen on 3003
let server: http.Server = http.createServer(app);
const port = 3003;
app.set('port', port);

server.listen(port, () => {
    console.log(`Server started at http://localhost:${ port }` );
});
server.on('error', onError);

// Handle error
function onError(error: Error) {
    console.log(error.message);
}
