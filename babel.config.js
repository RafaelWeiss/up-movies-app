module.exports = function(api) {
    const presets = ['babel-preset-expo'];
    const plugins = [];

    if (api.env() === 'development') {
        // for devs
    } else {
        // production
        // plugins.push('transform-remove-console');
    }

    api.cache(true);

    return { presets, plugins };
};
