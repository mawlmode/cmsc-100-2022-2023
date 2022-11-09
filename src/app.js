import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import cookie from '@fastify/cookie';
import session from '@fastify/secure-session';
import jwt from '@fastify/jwt';
import { Service } from './services/index.js';
import { Security } from './security/index.js';
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

  fastify.register(cookie);
  fastify.register(session, {
    secret: 'A very long string for the secret that should work',
    salt: '1234567890123456',
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60
    }
  });

  fastify.register(jwt, {
    secret: 'this is a very long string that will be used  for the jwt secret'
  });

  fastify.register(sensible);

  const service = new Service();
  const securityHandlers = new Security(fastify);

  const openAPIGlueOptions = {
    specification,
    service,
    securityHandlers,
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
