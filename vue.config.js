module.exports = {
  devServer: {
    proxy: "https://muxpresman.herokuapp.com"
  },
  transpileDependencies: [
    'vuetify'
  ]
}
