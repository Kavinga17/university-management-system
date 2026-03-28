const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Enrollment Service API', version: '1.0.0', description: 'Enrollment Microservice - University Management System | IT4020 Assignment 2 | Member 4' },
    servers: [
      { url: 'http://localhost:3004', description: 'Direct access' },
      { url: 'http://localhost:3000', description: 'Via API Gateway' },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => { res.setHeader('Content-Type', 'application/json'); res.send(swaggerSpec); });
  console.log('📄 Swagger Docs available at http://localhost:3004/api-docs');
};

module.exports = swaggerDocs;
