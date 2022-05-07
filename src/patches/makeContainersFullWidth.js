export default (body, { path }) =>
  body +
  (path.includes('faculty-') && path.includes('studies')
    ? `<style> .container { max-width: 98%; } </style>`
    : '');
