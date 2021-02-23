module.exports = {
  devServer: {
    proxy: "http://api.back.end"
  },
  transpileDependencies: [
    'vuetify'
  ]
}
