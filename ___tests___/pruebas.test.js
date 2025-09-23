import request from 'supertest';
import app from '../routesAndControllers/controller.js'; // tu app de express

const { getTask } = require ('../routesAndControllers/controller.js')
test('Esta es la prueba de /GET tareas', () => {
  expect(() => getTask.toEqual)
})