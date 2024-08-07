const path = require("path");

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const remoteProduction = {
  workflowRemote: `workflow_remote_module@https://test-workflow-two.vercel.app/remoteEntry.js`,
};

const remoteLocal = {
  workflowRemote: `workflow_remote_module@http://localhost:3102/remoteEntry.js`,
};

const remotes =
  process.env.NODE_ENV === "production" ? remoteProduction : remoteLocal;

module.exports = {
  distDir: "build",
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_DEFAULT_API_PREFIX}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_DEFAULT_PROXY}/:path*`,
      },
    ];
  },
  transpilePackages: [
    // antd & deps
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config, _options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        dts: false,
        exposes: {},
        remotes,
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};
