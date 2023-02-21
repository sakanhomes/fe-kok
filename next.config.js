const nextTranslate = require('next-translate')

module.exports = () =>
  nextTranslate({
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: [],
    },
  })
