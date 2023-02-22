const nextTranslate = require('next-translate')

module.exports = () =>
  nextTranslate({
    typescript: {
      ignoreBuildErrors: true,
    },
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: [],
    },
  })
