/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor :{
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#CED9D9',
        'main-400': '#C0D8D8',
        'main-500': '#0E8080',
        'overlay-30' : 'rgba(77, 74, 73,0.3)'
      },
      colors:{
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#CED9D9',
        'main-400': '#C0D8D8',
        'main-500': '#0E8080'
      },
      keyframes:{
        'slide-right': {
          '0%': {
            '-webkit-transform' : 'translateX(-500px)',
                    transform : ' translateX(-500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
                    transform: 'translateX(0)'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform' : 'translateX(500px)',
                    transform : ' translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
                    transform: 'translateX(0)'
          }
        },
        'slide-left1': {
          '0%': {
            '-webkit-transform' : 'translateX(500px)',
                    transform : ' translateX(500px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
                    transform: 'translateX(0)'
          }
        },
        'rotate-center': {
          '0%': {
            '-webkit-transform' : 'rotate(0)',
                  transform : ' rotate(0)'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
                  transform: 'rotate(360deg)'
          }
        },
        'rotate-center-pause': {
          '0%': {
            '-webkit-transform' : 'rotate(0)',
                  transform : ' rotate(0)',
                  'border-radius':'999px',
          },
          '99%':{
            'border-radius':'999px',
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
                  transform: 'rotate(360deg)',
          }
        },
        'scale-up-center' : {
          '0%': {
            '-webkit-transform': "scale(0.5)",
                    transform:' scale(0.5)',
          },
          '100%' : {
            '-webkit-transform': 'scale(1)',
                    transform: 'scale(1)',
          }
        },

        'scale-up-image' : {
          '0%': {
            '-webkit-transform': "scale(1)",
                    transform:' scale(1)',
          },
          '100%' : {
            '-webkit-transform': 'scale(1.2)',
                    transform: 'scale(1.2)',
          }
        },
        'scale-down-image' : {
          '0%': {
            '-webkit-transform': "scale(1.2)",
                    transform:' scale(1.2)',
          },
          '100%' : {
            '-webkit-transform': 'scale(1)',
                    transform: 'scale(1)',
          }
        },
      },
      animation:{
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-left1': 'slide-left1 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'rotate-center':'rotate-center 7s linear infinite',
        'rotate-center-pause' : 'rotate-center-pause 1s ease-in-out 1 both',
        'scale-up-center' :'scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'scale-up-image' :'scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'scale-down-image' :'scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      flex: {
        '4' : '4 4 0%',
        '6' : '6 6 0%',
        '3' : '3 3 0%',
        '7' : '7 7 0%',
      }

    },
    screens:{
      '1600':'1600px',
      '1130':'1130px',
      '1248':'1248px'
    } 
  },
  plugins: [],
}
