import { customElement, property } from 'lit/decorators.js';
import { LitNoShadow } from '../../utils/lit-no-shadow/index.js';
import { changeUrl } from '../../utils/helpers/change-url.js';
import { template } from './template.js';
import { html } from 'lit';

/**
 * @type {LitPage}
 */
@customElement('register-component')
class Component extends LitNoShadow {
    @property({ type: String })
    errorMessage = ''

    render () {
      return template.bind(this)();
    }

    async register (event) {
      event.preventDefault();

      const { target: form } = event;

      const username = form.username.value;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const password = form.password.value;

      const response = await window.fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          password
        })
      });

      if (response.status === 200) {
        this.errorMessage = '';
        html`Registered Successfully!`;
        return changeUrl('/login');
      }

      const { message, error } = await response.json();
      this.errorMessage = `HTTP Code: ${response.status} - ${error} - ${message}`;
    }
}

export { Component };
