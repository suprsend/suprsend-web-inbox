const path = require("path");
const PACKAGE = require("./package.json");

module.exports = (env) => {
  let buildType = env.type;
  let output;

  if (buildType === "browser") {
    output = {
      path: path.resolve(__dirname, "dist-cdn"),
      filename: `v${PACKAGE.version}.js`,
      clean: true,
      library: {
        name: "SuprSend",
        type: "window",
      },
    };
  } else if (buildType === "module") {
    output = {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
      library: { name: "SuprSend", type: "umd" },
    };
  } else if (buildType === "esm") {
    output = {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.esm.js",
      library: { type: "module" },
    };
  }

  return {
    entry: "./src/index.js",
    output: output,
    mode: "production",
    experiments: {
      outputModule: buildType === "esm",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
  };
};
