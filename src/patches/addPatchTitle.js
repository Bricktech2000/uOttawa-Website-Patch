export default (body) =>
  body
    .replace(
      /<title>(.*?)<\/title>/g,
      (a, b) => `<title>PATCHED | ${b}</title>`
    )
    .replace(
      /<meta (name|property|itemprop)="(.*?)title" content="(.*?)" \/>/g,
      (a, b, c, d) => `<meta ${b}="${c}title" content="PATCHED | ${d}" \/>`
    );
