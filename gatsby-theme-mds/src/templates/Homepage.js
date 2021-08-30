import React from "react";
import Layout from '../components/Layout';

export default ({
  pageContext,
  children,
  showHeaderItems,
  ...rest
}) => {
  const {
    frontmatter = {},
    titleType,
    relativePagePath,
  } = pageContext;
  const { title, description, keywords, date } =
    frontmatter;
  return (
    <Layout
      pageTitle={title}
      titleType={titleType}
      pageDescription={description}
      pageKeywords={keywords}
      relativePagePath={relativePagePath}
      showHeaderItems={false}
    >
      {children}
    </Layout>
  );
};
