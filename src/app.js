import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import { Service } from './services/index.js';
import { specification } from './specification/index.js';

// import { general } from './services/general/index.js';
// import { createTodo } from './services/todos/create-todo.js';
// import { deleteTodo } from './services/todos/delete-todo.js';
// import { getManyTodo } from './services/todos/get-many-todo.js';
// import { getTodo } from './services/todos/get-todo.js';
// import { updateTodo } from './services/todos/update-todo.js';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const service = new Service();

  const openAPIGlueOptions = {
    specification,
    service,
    prefix 
  };

  const swaggerOptions = {
    openapi: specification,
    routePrefix: '/docs',
    exposeRoute: true
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

  // fastify.get(prefix, general);

  // fastify.post(`${prefix}/todo`, createTodo);

  // fastify.get(`${prefix}/todo`, getManyTodo);

  // fastify.get(`${prefix}/todo/:todoId`, getTodo);

  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);

  // fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}
