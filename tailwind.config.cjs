module.exports = {
    content: [
        './index.html',
        './demo/**/*',
    ],
    theme: {
        extend: {},
    },
    presets: [
        require('@vue-interface/form-control/tailwindcss')
    ],
    plugins: [
        require('@vue-interface/btn/tailwindcss')(),
        require('@vue-interface/btn-group/tailwindcss'),
    ],
    safelist: [
        ...require('@vue-interface/btn/tailwindcss/safelist')(),
        ...require('@vue-interface/btn-group/tailwindcss/safelist')(),
        ...require('@vue-interface/form-control/tailwindcss/safelist')()
    ]
};