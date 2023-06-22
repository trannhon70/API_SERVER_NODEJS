const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Replace with your server URL
      },
    ],
  },
  apis: ['./routers/*.js'], // Replace with the paths to your router files
};


  module.exports = options;