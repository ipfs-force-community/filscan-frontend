import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
       screens: {
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
        },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'PingFang': ['PingFang SC', 'sans-serif'],
        'Barlow':['Barlow'],
        "DIN":['DINPro']
      },
      colors: {
        // 亮色模式颜色配置
        bgColor: '#FFFFFF',
        font:'#000000',
        border_des: 'F0F1F3',
        border: '#EEEFF1',
        primary: '#1C6AFD',
        bg_hover:'rgba(28, 106, 253, 0.1)',

        icon_border: 'rgba(0,0,0,0.2)',

          secondary: '#00FF00',
        // 暗色模式颜色配置
        dark: {
           font:'#FFFFFF',
          bgColor:'#000000',
        },
      },
    
    },
  },
  plugins: [],
}
export default config
