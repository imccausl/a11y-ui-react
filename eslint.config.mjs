import eslintConfig from '@imccausl/eslint-config';

export default [
    {
        "ignores": [
            "dist",
            "node_modules",
            "pnp.*",
            ".yarn",
            "**/lib/**/*",
        ]
    },
    ...eslintConfig,
]
