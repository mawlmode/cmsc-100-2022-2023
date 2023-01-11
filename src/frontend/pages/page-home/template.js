import { html } from 'lit';

export function template () {
  return html`<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans">
    <style>
      home-box {
        display: block;
        position: relative;
        width: 398px;
        padding: 50px;
        margin: 10px;
        height: 160px;
        margin-left: auto;
        margin-right: auto;
        top: 228px;

        background: #D9D9D9;
        border-radius: 20px;
      }

      p {
        font-family: 'PT Sans';
        font-weight: bold;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <home-box>
      <p>
        welcome to two doe. your day to day companion.
      </p>
    </home-box>
  </body>
  `;
}
