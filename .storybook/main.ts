import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"; 

const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-addon-pseudo-states"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    typescript: {
        reactDocgen: "react-docgen-typescript", 
    },
    
    webpackFinal: async (config: any) => {
      if (config.resolve) {
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, "../tsconfig.json"),
            }),
        ];
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../src"),
        };
        config.resolve.modules = [
            path.resolve(__dirname, '..'),
            'node_modules',
        ];
      }
      if (config.module?.rules) {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: require.resolve("babel-loader"),
                    options: {
                        presets: [
                            require.resolve("@babel/preset-env"),
                            require.resolve("@babel/preset-react"),
                            require.resolve("@babel/preset-typescript"),
                        ],
                    },
                },
            ],
        });
        
      }
      return config;
    },
};

// const config: StorybookConfig = {
//     stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
//     addons: [
//         "@storybook/addon-essentials",
//         "@storybook/addon-interactions",
//     ],
//     framework: {
//         name: "@storybook/react-webpack5",
//         options: {
//             // builder: {
//             //     useSWC: true
//             // }
//         },
//     },
//     typescript: {
//         reactDocgen: 'react-docgen-typescript' as const,
//     },
//     webpackFinal: async (config: any) => {
//         // if (config.module?.rules) {
//         //     config.module.rules.push({
//         //         test: /\.(ts|tsx)$/,
//         //         exclude: /node_modules/,
//         //         use: [
//         //             {
//         //             loader: require.resolve("ts-loader"),
//         //             options: {
//         //                 transpileOnly: true, 
//         //             },
//         //             },
//         //         ],
//         //     });
//         // }
            
//         if (config.resolve) {
//             config.resolve.plugins = [
//                 ...(config.resolve.plugins || []),
//                 new TsconfigPathsPlugin({
//                     configFile: path.resolve(__dirname, "../tsconfig.json"),
//                 }),
//             ];

//             config.resolve.alias = {
//                 ...config.resolve.alias,
//                 "@": path.resolve(__dirname, '../src'),
//             };
//         }
//         // config.resolve?.extensions?.push(".ts", ".tsx");
//         return config;
//     },
// };
export default config;
