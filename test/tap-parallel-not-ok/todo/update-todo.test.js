import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Update a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12 }),
    firstName: chance.first(),
    lastName: chance.last()
  };

  let cookie = '';

  it('Should return the user that was created a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/register`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(newUser.firstName);
    result.lastName.must.be.equal(newUser.lastName);

    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password
      })
    });

    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  })

  it('Should update the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update',
      description: 'Some description 2',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newerTodo.description);
    result.isDone.must.be.equal(newerTodo.isDone);
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('Should update the object given an ID and only isDone being updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.equal(newerTodo.isDone);
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  it('Should update the object given an ID and only title is updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.false();
    result.createdDate.must.be.equal(createdDate);
    result.updatedDate.must.be.above(updatedDate);
  });

  after(async () => {
    await app.close();
  });
});
