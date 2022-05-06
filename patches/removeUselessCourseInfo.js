export default (body, { path }) =>
  body +
  (path.includes('faculty-') &&
  path.includes('studies') &&
  !path.includes('/course-sequence')
    ? `<style>
    /* .featured-section-header { display: none; } */
    .field--name-field-fp__body > .field__item:nth-child(1) { display: none; }
    .field--name-field-fp__body > .field__item:nth-child(2) { display: none; }
  </style>`
    : '');
