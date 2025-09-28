module.exports = {
    jest: {
        configure: (jestConfig) => {
            jestConfig.setupFilesAfterEnv = [
                '<rootDir>/src/jest.setup.ts'
            ];

            const modulesToTransform = ['@standard-schema', '@reduxjs/toolkit'];
            jestConfig.transformIgnorePatterns = [
                `/node_modules/(?!(${modulesToTransform.join('|')})/)`
            ];

            return jestConfig;
        },
    },
};
