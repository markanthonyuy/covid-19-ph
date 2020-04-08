const TailwindExtractor = (content) => {
  return content.match(/[A-Za-z0-9-_:\/]+/g) || []
}

module.exports = {
  content: ['App.js', 'components/*'],
  css: ['tw.css'],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['html', 'js'],
    },
  ],
}
