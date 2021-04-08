const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const path = require('path');
const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    return Object.assign(
        config,
        override(
            babelInclude([
                path.resolve('src'),
                path.resolve('../public'),
            ])
        )(config, env)
    )
};