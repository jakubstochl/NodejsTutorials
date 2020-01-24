const express = require('express');
const morgan = require('morgan');
const logger = require('@lib/logger');
const error  = require('@lib/error')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const notesRouter = require('./routers/notes');
const performanceRouter = require('./routers/performance');

const app = express();

// To check if necessary
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Cache-Control, Pragma, Origin, ' +
        'Authorization, Content-Type, X-Requested-With'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(morgan('combined', { stream: logger.winston.stream }));
app.use(express.json());
app.use('/api/v1', notesRouter);
app.use('/api/v1/performance', performanceRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', notesRouter);
// Handle errors
app.use((err, req, res, next) => {
    if (! err) {
        return next();
    }
    error.handle(err, res);
});

module.exports = app;