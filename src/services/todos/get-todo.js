import { getDB } from '../../utils/db/index.js';

export const getTodo = async (request, reply) => {
  const { params, username } = request;
  const { todoId: id } = params;
  const db = await getDB();

  if (!username) {
    return reply.badRequest();
  }

  const { todos } = db;

  if (!todos[id]) {
    return reply.notFound();
  }

  if (todos[id].username !== username) {
    return reply.forbidden('You are not the owner of the todo');
  }

  return {
    id,
    ...todos[id]
  };
};
