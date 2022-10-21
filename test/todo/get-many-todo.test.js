import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Get many todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return a list of objects with default', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo`
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.length.must.not.be.above(5);
  });

  it('Should return a list of objects with default', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo?limit=2`
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.length.must.not.be.above(2);
  });
});
