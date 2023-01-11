import { html } from 'lit';
import '../../components/todo-component/index.js';

export function template () {
  return html`
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans">
    <style>
        h2 {
            font-family: 'PT Sans';
        }

        .todo {
            display: flex;
            align-items: center;
            margin: 10px;
            padding: 12px;

            background-color: #D9D9D9;
            border-radius: 12.5px;
        }

        .todo * {
            flex: 1;

            font-family: 'PT Sans';
        }

        .checkbox {
            width: 1.3em;
            height: 1.3em;
            background-color: white;
            border-radius: 50%;
            vertical-align: middle;
            border: 2px solid black;
            appearance: none;
            -webkit-appearance: none;
            outline: none;
            cursor: pointer;
        }

        .checkbox:checked {
            background-color: #625A5A;
            border: 2px solid black;
        }
    </style>
    <h2>
        Your To-do List
    </h2>

    ${this.errorMessage
        // if this is an errorMessage
        ? html`
            <div class="flex-group">
                ${this.errorMessage}
            </div>
        `
        : ''}
    <div class="todo-list">
        ${this.todos.map(todo => html`
            <div class="todo">
                <p>
                    <input type="checkbox" class="checkbox" .checked=${todo.isDone} id="${todo.id}" @click="${this.checkedTodo}">
                </p>
                <a href="/todos/${todo.id}">
                    ${todo.title}
                </a>
                <p>
                    ${todo.description} - Created at: ${new Date(todo.createdDate)}
                </p>
            </div>
        `)}
    </div>

    <todo-component @submit-todo="${this.createTodo}"></todo-component>
    `;
}
