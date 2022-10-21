import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Get a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/todo/${id}`
    });

    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.false();
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
