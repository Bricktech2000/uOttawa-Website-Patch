export default (body, { domain, host }) =>
  body.replace(/<a(.*?) href="(.*?)"(.*?)>/g, (a, b, c, d) => {
    if (c.startsWith(domain)) {
      return `<a${b} href="http://${host}${c.replace(domain, '')}"${d}>`;
    } else {
      return `<a${b} href="${c}"${d}>`;
    }
  });
