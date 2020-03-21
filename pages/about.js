import React, { Component } from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

class About extends Component {
  render () {
    const seoImage = 'https://food.grab.com/static/images/social-hero-ID.jpg'
    return (
      <div>
        <NextSeo
          title='Using More of Config'
          description='This example uses more of the available config options.'
          canonical='https://www.canonical.ie/'
          openGraph={{
            url: 'https://www.url.ie/a',
            title: 'Open Graph Title',
            description: 'Open Graph Description',
            images: [
              {
                url: seoImage,
                width: 450,
                height: 298,
                alt: ''
              }
            ],
            site_name: 'SiteName'
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image'
          }}
        />
        <Head>
          <meta property='og:image:secure_url' content={seoImage} />
        </Head>
        This is about page
      </div>
    )
  }
}

export default About
