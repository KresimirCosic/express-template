import express from 'express';

export const login = express.Router();

login.post('', function (request, response) {
  // todo
  response.json(request.body);
});
