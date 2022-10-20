import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createTodo } from './services/todos/create-todo.js';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });

  fastify.get(prefix, general);

  fastify.post(`${prefix}/todo`, createTodo);

  return fastify;
}
