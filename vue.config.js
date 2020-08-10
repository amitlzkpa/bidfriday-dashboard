require('dotenv').config();

// const PORT = process.env.PORT || 8080;
const PORT = 3001;

module.exports = {
  outputDir: 'build',
  devServer: {
    disableHostCheck: true,
    port: PORT,
    progress: false,
    proxy: {
      "/api": {
        target: `http://localhost:3000/`,
        logLevel: "debug"
      }
    }
  }
};