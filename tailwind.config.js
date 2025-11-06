module.exports = {
    darkMode: 'false',
    purge: {
        content: ['./src/**/*.html'],
        safelist: [
            'text-ctp-red',
            'text-ctp-blue',
            'text-ctp-green',
            'text-ctp-yellow',
            'text-ctp-peach',
            'text-ctp-mauve',
            'text-ctp-lavender',

            'bg-ctp-base',
            'bg-ctp-red',
            'bg-ctp-blue',
            'bg-ctp-green',
            'bg-ctp-surface',
            'bg-ctp-surface1',
            'bg-ctp-surface2',

            'border-ctp-red',
            'border-ctp-blue',

            'hollow-shadow-red',
            'hollow-shadow-blue',

            {
                pattern: /bg-ctp-(rosewater|flamingo|pink|mauve|red|maroon|peach|yellow|green|teal|saphhire|sky|lavender|blue|subtext0|overlay0)/,
            },
            {
                pattern: /md:bg-ctp-(rosewater|flamingo|pink|mauve|red|maroon|peach|yellow|green|teal|saphhire|sky|lavender|blue|subtext0|overlay0)/,
            },
            'md:opacity-50',
        ]
    },
}