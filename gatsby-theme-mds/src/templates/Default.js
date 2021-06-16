import React from 'react';
import Layout from '../components/Layout';
import LastModifiedDate from '../components/LastModifiedDate';


export default ({ pageContext, children }) => {

  const { frontmatter = {}, titleType } = pageContext;
  const {
    title,
    description,
    keywords,
    date,
  } = frontmatter;

  return (
    <Layout
      pageTitle={title}
      titleType={titleType}
      pageDescription={description}
      pageKeywords={keywords}
    >
      {children}
      <LastModifiedDate date={date} />
    </Layout>
  )
}