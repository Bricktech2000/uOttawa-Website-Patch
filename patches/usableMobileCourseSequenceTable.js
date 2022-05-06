export default (body, { path }) =>
  body +
  (path.includes('faculty-') && path.includes('studies')
    ? `<style>
    .rich-text__table th { min-width: 0; }
    .rich-text__table td { min-width: 250px; padding: 0.5em; }
    .rich-text__table.clone { display: none; }
    .rich-text ul > li, .rich-text ol > li { list-style: none; padding-left: 0; margin: 0 0.5em; }
    .rich-text ul, .rich-text ol { padding-left: 0; }
    .article-body-left { padding: 0; }
  </style>`
    : '');
