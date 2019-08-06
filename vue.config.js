module.exports = {
  lintOnSave: false,
  publicPath: `/${process.env.CONTAINER_NAME || ''}`,
  assetsDir: 'static',
};
