const path = require('path');


module.exports = (themeOptions) => {

  const repositoryDefault = {
    baseUrl: '',
    subDirectory: '',
    branch: 'main',
  };

  const {
    isSearchEnabled = true,
    withWebp = false,
    mdxExtensions = ['.mdx', '.md'],
    imageQuality = 75,
    repository,
    pngCompressionSpeed = 4, // default for gatsby-plugin-sharp
    gatsbyRemarkPlugins = [],
    remarkPlugins = [],
    gatsbyPluginSharpOptions = {},
    isServiceWorkerEnabled = false,
  } = themeOptions;


  const defaultRemarkPlugins = [
    { resolve: `gatsby-remark-unwrap-images` },
    { resolve: `gatsby-remark-smartypants` },
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1152,
        linkImagesToOriginal: false,
        quality: imageQuality,
        withWebp,
        pngCompressionSpeed,
        ...gatsbyPluginSharpOptions,
      },
    },
    { resolve: `gatsby-remark-responsive-iframe` },
    { resolve: `gatsby-remark-copy-linked-files` },
  ];


  return {
    siteMetadata: {
      isSearchEnabled,
      isServiceWorkerEnabled,
      title: 'Gatsby Theme MDS',
      description:
        'Add a description by supplying it to siteMetadata in your gatsby-config.js file.',
      keywords: 'gatsby,theme,MDS,design',
      lang: 'en',
      repository: { ...repositoryDefault, ...repository },
    },
    plugins: [
      `gatsby-transformer-yaml`,
      {
        resolve: `gatsby-source-filesystem`,
        name: `Nav`,
        options: {
          path: path.resolve(`./src/data`),
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: mdxExtensions,
          gatsbyRemarkPlugins: [
            ...defaultRemarkPlugins,
            ...gatsbyRemarkPlugins,
          ],
          remarkPlugins,
          defaultLayouts: {
            default: require.resolve('./src/templates/Default.js'),
            home: require.resolve('./src/templates/Homepage.js'),
          },
        },
      },
    ]
  }
}
