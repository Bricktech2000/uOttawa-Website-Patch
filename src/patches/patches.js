// # Patch List
// comment out unwanted patches

const patches = [
  './linkProxyRedirect.js',
  './addPatchTitle.js',
  './deleteCovidBanner.js',
  './deleteCookieConsent.js',
  './makeContainersFullWidth.js',
  './usableMobileCourseSequenceTable.js',
  './decreaseHeadingFontSize.js',
  './decreaseImageHeadingSize.js',
  './removeUselessCourseInfo.js',
  './removeUselessCourseSequenceInfo.js',
];

export default (
  await Promise.all(patches.map((filename) => import(filename)))
).map((module) => module.default);
