export const renderClient= () => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/node_modules/@markforged/bedrock/dist/index.css" />
        <link rel="stylesheet" href="/dist/assets/index.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Eiger Mock App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/dist/assets/index.js"></script>
      </body>
    </html>
  `;
}