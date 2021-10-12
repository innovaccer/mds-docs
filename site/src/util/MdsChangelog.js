import { useStaticQuery, graphql } from 'gatsby';

export function MdsChangelog() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    query MDS_CHANGELOG {
      allMdx(filter: {frontmatter: {title: {eq: "Release Note"}}}) {
        edges {
          node {
            internal {
              content
            }
            headings(depth: h2) {
              value
            }
          }
        }
      }
    }  
  `);

  const items = edges.map(({ node }) => node);

  const metadata = items[0].headings[0].value;

  const version = metadata.substring(0, metadata.indexOf('('));
  const releaseDate = metadata.substring(
    metadata.indexOf("(") + 1,
    metadata.lastIndexOf(")")
  );

  const record = {
    version: version,
    releaseDate: releaseDate,
    updatesList: []
  }

  const htmlContent = items[0].internal.content;
  const latestUpdate = htmlContent.split('\n----')[0];

  let updateList = latestUpdate.split('###');

  const listSeparator = '*';

  updateList.shift();
  updateList
    .filter((item) => item.includes(listSeparator))
    .map((item) => record.updatesList.push(item.split(listSeparator)));

  return record;
}
