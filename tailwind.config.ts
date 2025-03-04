import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contents/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      visibility: ['group-hover'],
      content: ['before', 'after'],
      gridTemplateColumns: {
        custom: '25% 30% 30% 15%',
      },
    },
  },
  theme: {
    extend: {
      width: {
        inherit: 'inherit',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1280px',
        '2xl': '1440px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        HarmonyOS: ['HarmonyOS_Regular'],
        Barlow: ['Barlow'],
        HarmonyOS_Bold: ['HarmonyOS_Bold'],
        HarmonyOS_Medium: ['HarmonyOS_Medium'],
      },

      colors: {
        // 亮色模式颜色配置
        warnColor: '#A56B3B',
        bgColor: '#FFFFFF',
        bgDesColor: '#F6F6F6',
        bg_color_5: 'rgba(0,0,0,0.05)',
        footerColor: '#222121',
        font: '#000000',
        font_des: 'rgba(0,0,0,0.6)',
        accountBg: 'rgba(0,0,0,0.9)',
        border_des: '#F0F1F3',
        border: '#E6E8Eb',
        primary: '#1C6AFD',
        bg_hover: 'rgba(28, 106, 253, 0.1)',
        select_bg: 'rgba(28, 106, 253, 0.6)',
        icon_border: 'rgba(0,0,0,0.2)',
        bgCopy: 'rgba(51, 106, 250, 0.5)',
        secondary: '#00FF00',
        success: '#059b02',
        tipColor: '#1c1c1c',
        fvmBg: '#020A1A',
        success_bg: 'rgba(64, 162, 145, 0.10)',
        mobile_font: '#333',
        // // 暗色模式颜色配置
        // dark: {
        //   font:'#FFFFFF',
        //   bgColor: '#090A0A',
        //   border: '#222',
        //   border_des: '#1C1C1C',
        //   bgDesColor: 'rgba(255,255,255,0.1)',
        //   font_des:'rgba(255,255,255,0.6)',
        // },
      },
    },
  },
  plugins: [],
  // plugins: [
  //     plugin(function({ addUtilities, e, theme }) {
  //     const colors:any = theme('colors', {})
  //     const colorModes = ['light', 'dark']
  //     const createUtilityClass = (mode:string, property:any, color:any) => {
  //     return `.${mode === 'dark' ? 'dark ' : ''}${property}-${e(color)}`
  //     }
  //     const newUtilities = colorModes.reduce((acc:any, mode:string) => {
  //     const modeColors = colors[mode];
  //     console.log('--mode',mode)
  //     Object.keys(modeColors).forEach((color) => {
  //     const utilityClassBg = createUtilityClass(mode, 'bg', color)
  //     const utilityClassText = createUtilityClass(mode, 'text', color)
  //     const utilityClassBorder = createUtilityClass(mode, 'border', color)
  //     acc[utilityClassBg] = { backgroundColor: modeColors[color] }
  //     acc[utilityClassText] = { color: modeColors[color] }
  //     acc[utilityClassBorder] = { borderColor: modeColors[color] }
  //     })
  //       console.log('---3',acc)
  //     return acc
  //     }, {})

  //       addUtilities(newUtilities)
  //     }),
  //     ],
}
export default config
