import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Get many todo should work', async () => {
  let app;

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
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

  it('Should return a list of objects with default', async () => {
    const response = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/todo`
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.length.must.not.be.above(5);
  });

  it('Should return a list of objects with default', async () => {
    const response = await app.inject({
      method: 'GET',
      headers: {
        cookie
      },
      url: `${prefix}/todo?limit=2`
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.length.must.not.be.above(2);
  });

  after(async () => {
    await app.close();
  });
});
