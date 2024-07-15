const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
	theme: {
    extend: {
      colors: {
        "color-heading": "rgb(var(--color-heading) / <alpha-value>)",
        "color-primary": "rgb(var(--color-primary) / <alpha-value>)",
        "color-dim": "rgb(var(--color-dim) / <alpha-value>)",
        "color-dim-1": "rgb(var(--color-dim-1) / <alpha-value>)",
        "color-dim-2": "rgb(var(--color-dim-2) / <alpha-value>)",
        "color-dimmer": "rgb(var(--color-dimmer) / <alpha-value>)",
        "color-background": "rgb(var(--color-background) / <alpha-value>)",
        "color-background-bright": "rgb(var(--color-background-bright) / <alpha-value>)",
        "color-accent": "rgb(var(--color-accent) / <alpha-value>)",
        "color-accent-dim": "rgb(var(--color-accent-dim) / <alpha-value>)",

        black: "#36343A",
        "gray-90": "#36343A",
        "gray-80": "#464251",
        "gray-70": "#54515D",
        "gray-60": "#6A6771",
        "gray-50": "#94919D",
        "gray-40": "#C8C7CC",
        gray: "#D7D6DB",
        "gray-30": "#D7D6DB",
        "gray-20": "#EDEDED",
        "gray-10": "#F5F5F5",
        "gray-5": "#FBFBFB",
        "gray-variant-90": "#231C36",
        "gray-variant-80": "#312946",
        "gray-variant-70": "#4A4164",
        "gray-variant-50": "#9790A6",
        "purple-100": "#1D182E",
        "purple-90": "#231C36",
        "purple-80": "#312946",
        "purple-70": "#4F3D72",
        "purple-50": "#6B40E4",
        "purple-40": "#9371F4",
        "purple-30": "#C0ADE5",
        "purple-20": "#D5C5F5",
        "purple-10": "#EFEEF1",
        "orange-70": "#C73F14",
        "orange-50": "#EC4D1B",
        "orange-30": "#F47D58",
        "orange-10": "#FCC6B4",
      },
      fontFamily: {
        sans: [
					"Soehne",
					...fontFamily.sans
				],
      },
      typography: {
        DEFAULT: {
          css: {
            'table': {
              'tr': {
                'td:first-child': {
                  'border-left-width': '1px'
                },
                'td:last-child': {
                  'border-right-width': '1px'
                },
              },
              'tr:first-child': {
                'td': {
                  'border-top-width': '1px',
                },
                'td:first-child': {
                  'border-top-left-radius': '4px'
                },
                'td:last-child': {
                  'border-top-right-radius': '4px'
                },
              },
              'tr:last-child': {
                'td:first-child': {
                  'border-bottom-left-radius': '4px'
                },
                'td:last-child': {
                  'border-bottom-right-radius': '4px'
                }
              },
            },
            // ol: {
            //   margin: 0,
            //   padding: 0,
            //   "list-style-type": "none",
            //   li: {
            //     "counter-increment": "step-counter",
            //     "&:before": {
            //       content: "counter(step-counter)",
            //       "margin-left": "-2rem"
            //     }
            //   }
            // },
          },
        },
      },
    },
	},
	plugins: [
    require("@tailwindcss/typography"),
  ],
}
