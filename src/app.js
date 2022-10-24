import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import { general } from './services/general/index.js';
import { createTodo } from './services/todos/create-todo.js';
import { deleteTodo } from './services/todos/delete-todo.js';
import { getManyTodo } from './services/todos/get-many-todo.js';
import { getTodo } from './services/todos/get-todo.js';
import { updateTodo } from './services/todos/update-todo.js';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  fastify.get(prefix, general);

  fastify.post(`${prefix}/todo`, createTodo);

  fastify.get(`${prefix}/todo`, getManyTodo);

  fastify.get(`${prefix}/todo/:todoId`, getTodo);

  fastify.put(`${prefix}/todo/:todoId`, updateTodo);

  fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}
