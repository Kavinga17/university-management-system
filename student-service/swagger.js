const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Service API',
      version: '1.0.0',
      description:
        'Student Microservice for University Management System — IT4020 Assignment 2',
      contact: {
        name: 'Member 1 — Student Service',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Direct access (Student Service)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Via API Gateway',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  // Swagger UI page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Swagger JSON endpoint
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📄 Swagger Docs available at http://localhost:3001/api-docs`);
};

module.exports = swaggerDocs;
