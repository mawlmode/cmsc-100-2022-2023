import { html } from 'lit';

export function template () {
  return html`<header>
    <h1>
    <a href="/">
        two doe
    </a>
    </h1>

    <nav>
    ${this.loggedIn
        ? html`
            <a href="/logout">
                logout
            </a>
        `
        : html`
            <a href="/login">
                login
            </a>

            <a href="/register">
                register
            </a>
        `}
    </nav>
    </header>`;
}
