import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const Chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Creating a todo should work', async () => {
  let app;

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12 }),
    firstName: chance.first(),
    lastName: chance.last()
  };

  let cookie = '';

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  it ('Should return the user that was created a new user', async () => {
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
  });

  it('Should return the object that was created with ID with isDone = false without isDone being given', async () => {
    const newTodo = {
      title: 'New Todo',
      description: 'Some description'
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.id.must.not.be.null();
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.false();
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('Should return the object that was created with ID with isDone = to the given object', async () => {
    const newTodo = {
      title: 'New Todo 2',
      description: 'Some description 2',
      isDone: true
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newTodo)
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.id.must.not.be.null();
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.equal(newTodo.isDone);
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  after(async () => {
    await app.close();
  });
});
