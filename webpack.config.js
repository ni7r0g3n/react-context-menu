const path = require("path");

module.exports = (api) => {
  api.cache(true);

  return {
    resolve: {
      alias: {
        ...api.resolve,
        react: path.join(__dirname, "node_modules/react"),
        "react-dom": path.join(__dirname, "node_modules/react-dom"),
      },
    },
  };
};
