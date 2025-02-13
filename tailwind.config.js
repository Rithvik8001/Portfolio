/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			accent: 'var(--accent)',
  			gray: {
  				'1': 'var(--gray-1)',
  				'2': 'var(--gray-2)',
  				'3': 'var(--gray-3)',
  				'4': 'var(--gray-4)',
  				'5': 'var(--gray-5)',
  				'6': 'var(--gray-6)',
  				'7': 'var(--gray-7)',
  				'8': 'var(--gray-8)',
  				'9': 'var(--gray-9)',
  				'10': 'var(--gray-10)',
  				'11': 'var(--gray-11)',
  				'12': 'var(--gray-12)'
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}; 