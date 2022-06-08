export default (body, { domains, host }) =>
  body.replace(/<a(.*?) href="(.*?)"(.*?)>/g, (a, b, c, d) => {
    const match = domains.filter((domain) => c.startsWith(domain))[0];

    // hacky way to get the "Why choose uOttawa?" button working
    // www.uottawa.ca/this-is-uottawa/ redirects to www2.uottawa.ca/study/this-is-uottawa/ but
    // www2.uottawa.ca/this-is-uottawa/ returns a 404 error
    if (c.includes('this-is-uottawa')) c = `/study${c}`;

    if (match)
      return `<a${b} href="http://${host}${c.replace(match, '')}"${d}>`;
    else return `<a${b} href="${c}"${d}>`;
  });
