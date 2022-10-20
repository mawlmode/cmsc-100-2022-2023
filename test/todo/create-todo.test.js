import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Creating a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
});
