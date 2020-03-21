import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'

// from https://github.com/zeit/next.js/edit/canary/examples/with-react-helmet/pages/_document.js
export default class extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const documentProps = await Document.getInitialProps(ctx)
      return {
        ...documentProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {documentProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  get helmetJsx () {
    const title = 'Hello next.js Real World!'
    return (
      <Helmet>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:title' content={title} />
      </Helmet>
    )
  }

  render () {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          { this.helmetJsx }
          { this.helmetHeadComponents }
          {/* Facebook Open Graph */}
          <meta property='og:url' content='https://food.grab.com' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='GrabFood Merchant Directory' />
          <meta property='og:description' content='Your favourite food delivered hot and fresh! Find restaurant menus, cuisines and dishes available in GrabFood across South East Asia.' />
          <meta property='og:image' content='https://food.grab.com/static/images/social-hero-ID.jpg' />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:locale' content='id_ID' />
          <meta property='og:site_name' content='Grabfood Merchant Directory' />

          {/* Twitter Card */}
          <meta property='twitter:image' content='https://food.grab.com/static/images/social-hero-ID.jpg' />
          <meta property='twitter:title' content='GrabFood Merchant Directory' />
          <meta property='twitter:app:id:iphone' content='647268330' />
          <meta property='twitter:app:id:googleplay' content='com.grabtaxi.passenger' />
          <meta property='twitter:site' content='@GrabSG' />
          <meta property='twitter:description' content='Your favourite food delivered hot and fresh! Find restaurant menus, cuisines and dishes available in GrabFood across South East Asia.' />
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
