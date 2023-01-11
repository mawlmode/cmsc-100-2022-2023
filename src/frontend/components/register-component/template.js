import { html } from 'lit';

export function template () {
  return html`
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans">
    <style>
        form {
            display: block;
            position: relative;
            width: 398px;
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            top: 228px;

            background-color: #D9D9D9;
            border-radius: 20px;
        }

        form .label-input-group {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            padding: 10px 23px;
            gap: 50px;

            font-family: 'PT Sans';
            text-align: center;
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
            cursor: pointer;
            font-family: 'PT Sans';
        }

        form button:hover {
            background-color: #5A5353;

            color: white;
        }

        p {
            font-family: 'PT Sans';
            text-align: center;
        }
        </style>
        <form @submit=${this.register}>
            ${this.errorMessage
            // if this is an errorMessage
            ? html`
                <div class="flex group">
                    ${this.errorMessage}
                </div>
            `
            : ''}
            <div class="label-input-group">
                <label for="username">
                    Username:
                </label>
                <input type="text" placeholder="username" id="username" name="username" required>
            </div>

            <div class="label-input-group">
                <label for="firstName">
                    First Name:
                </label>
                <input type="text" placeholder="firstName" id="firstName" name="firstName" required>
            </div>

            <div class="label-input-group">
                <label for="lastName">
                    Last Name:
                </label>
                <input type="text" placeholder="lastName" id="lastName" name="lastName" required>
            </div>

            <div class="label-input-group">
                <label for="password">
                    Password:
                </label>
                <input type="password" placeholder="password" id="password" name="password" required>
            </div>

            <div class="flex-group">
                <button>
                    Register User
                </button>
            </div>
            <p>
                Already registered? <a href="/login">Login here</a>
            </p>
        </form>
    `;
}
