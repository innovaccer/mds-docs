require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    { resolve: `gatsby-theme-mds`, options: {} },
    {
      resolve: `gatsby-source-medium`,
      options: {
        username: `innovaccer-tech`,
      },
    }
  ],
}
