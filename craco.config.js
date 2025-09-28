module.exports = {
    jest: {
        configure: (jestConfig) => {
            jestConfig.setupFiles = [
                '<rootDir>/src/polyfills.ts',
            ];

            jestConfig.setupFilesAfterEnv = [
                '<rootDir>/src/jest.setup.ts',
            ];

            const modulesToTransform = [
                '@standard-schema',
                '@reduxjs/toolkit',
                'until-async',
                'msw',
                '@bundled-es-modules',
            ];

            jestConfig.transformIgnorePatterns = [
                `/node_modules/(?!(${modulesToTransform.join('|')})/)`,
            ];

            return jestConfig;
        },
    },
};
