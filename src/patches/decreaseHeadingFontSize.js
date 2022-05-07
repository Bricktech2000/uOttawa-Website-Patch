export default (body) =>
  body +
  `<style>
    .headline--1 {
      font-size: 2.5rem;
      line-height: 2.8125rem;
      margin-bottom: 0.5rem;
    }
    .typo-srg-24 {
      font-size: 1.5rem;
    }
    .headline--2 {
      font-size: 2.15rem;
      line-height: 2.8125rem;
    }
    .headline--3 {
      font-size: 1.5em;
      margin-bottom: 0.5em !important;
    }
    .sub-headline {
      padding-top: 1em;
    }
    .headline--2__underline {
      display: none;
    }
    .quick-links {
      padding-top: 0;
      padding-bottom: 0;
    }
  </style>`;
