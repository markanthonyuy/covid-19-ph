const TailwindExtractor = (content) => {
  return content.match(/[A-Za-z0-9-_:\/]+/g) || []
}

module.exports = {
  content: ['App.js'],
  css: ['tw.css'],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['html', 'js'],
    },
  ],
}
