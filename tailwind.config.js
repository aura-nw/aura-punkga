/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-gray": "var(--light-gray)",
        "light-medium-gray": "var(--light-medium-gray)",
        "medium-gray": "var(--medium-gray)",
        "subtle-dark": "var(--subtle-dark)",
        "primary-color": "var(--primary-color)",
        "second-color": "var(--second-color)",
        "light-green": "var(--light-green)",
        "light-yellow": "var(--light-yellow)",
        "medium-yellow": "var(--medium-yellow)",
        "light-medium-gray": "var(--light-medium-gray)",
      },
    },
  },
  plugins: [],
}