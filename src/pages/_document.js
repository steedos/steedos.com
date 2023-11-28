import clsx from 'clsx'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }


  render() {
    return (
      <Html lang="en" className="[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
        <Head>
          {/* Google Analytics 脚本 */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XVSWFLK780"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-XVSWFLK780');
              `,
            }}
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00b4b6" />
          <meta name="application-name" content="华炎魔方" />
  
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body
          className={clsx('antialiased text-slate-500 dark:text-slate-400', {
            'bg-white dark:bg-slate-900': !this.props.dangerousAsPath.startsWith('/examples/'),
            'login': this.props.dangerousAsPath.startsWith('/login')
          })}>
          <Main />
          <NextScript/>
        </body>
      </Html>
    )
  }
}
