import { html } from 'lit';

export function template () {
  return html`
        <style>
            .todo-create-form {
                display: flex;
                align-items: center;
                margin: 10px;
                padding: 12px;

                border: 2px dashed black;
                border-radius: 12.5px;
            }

            form .label-input-group {
                display: flex;
                flex: 3;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;
                padding: 10px 23px;
                gap: 50px;

                opacity: 70%;
                font-family: 'PT Sans';
            }

            form .flex-group {
                display: flex;
                padding: 10px;
                flex: 1;
            }

            form button {
                width: 120px;
                height: 36px;
                margin-right: 10px;
                margin-left: 10px;
                margin: auto;
                border: 2px solid black;
                background-color: white;
                border-radius: 12.5px;

                transition-duration: 0.5s;
                color: #5A5353;
                opacity: 70%;
                cursor: pointer;
                font-family: 'PT Sans';
            }
        </style>
        <form class="todo-create-form" @submit="${this.submitTodo}">
            <p style="font-family: PT Sans">
                Add to the To-do List
            </p>
            <div class="label-input-group">
                <label for="title">
                    Title:
                </label>
                <input type="text" placeholder="Title" id="title" value="${this.todo?.title}" required>
            </div>

            <div class="label-input-group">
                <label for="description">
                    Text:
                </label>
                <input type="text" placeholder="description" id="description" value="${this.todo?.description}" required>
            </div>

            <div class="label-input-group">
                <label for="isDone">
                    Is Done:
                </label>
                <input type="checkbox" id="isDone" name="isDone" .checked="${this.todo?.isDone}">
            </div>

            <div class="flex-group">
                <button>
                    Submit Todo
                </button>
            </div>
        </form>
    `;
}
