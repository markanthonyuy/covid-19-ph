const TailwindExtractor = (content) => {
  return content.match(/[A-Za-z0-9-_:\/]+/g) || []
}

module.exports = {
  content: ['src/App.js', 'src/components/*'],
  css: ['src/tw.css'],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['html', 'js'],
    },
  ],
}
