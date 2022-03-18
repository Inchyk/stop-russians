module.exports = {
  siteMetadata: {
    title: `Stop russians!`,
    siteUrl: `https://stop-russian.netlify.app`
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [
          [require('remark-oembed'), { syncWidget: true }]
        ]
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/equipment/`,
        name: 'equipments'
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Stop russians!`,
        short_name: `Stop russians!`,
        start_url: `/index.html`,
        background_color: `#F5F5F5`,
        theme_color: `#F5F5F5`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        cache_busting_mode: 'none',
        crossOrigin: `use-credentials`,
        icons: [
          {
            src: "public/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "public/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ["/*", "/**/**/index.html"],
        workboxConfig: {
          globPatterns: ['**/**/index.html', '**/favicon-32x32.png', '**/*.png', '**/*.jpg', "**/*.webp"]
       }
      }
    },
  ]
}
