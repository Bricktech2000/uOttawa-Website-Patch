// # Patch List
// comment out unwanted patches

export default [
  await import('./linkProxyRedirect.js'),
  await import('./addPatchTitle.js'),
  await import('./deleteCovidBanner.js'),
  await import('./makeContainersFullWidth.js'),
  await import('./usableMobileCourseSequenceTable.js'),
  await import('./decreaseHeadingFontSize.js'),
  await import('./decreaseImageHeadingSize.js'),
  await import('./removeUselessCourseInfo.js'),
  await import('./removeUselessCourseSequenceInfo.js'),
];
