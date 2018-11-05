import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class MyApp extends App {
    render() {
        const {Component, pageProps, pathname} = this.props;
        return (
            <Container>
                <Head>
                    <title>Code & Beer!</title>
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
   @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(./static/fonts/Lato-Regular-Lat-Ext.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(./static/fonts/Lato-Regular-Lat.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: url(./static/fonts/Material-Icons.woff2) format('woff2');
      }
      
      .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }
      @font-face {
        font-family: 'Ubuntu Mono';
        font-style: normal;
        font-weight: 700;
        src: local('Ubuntu Mono Bold'), local('UbuntuMono-Bold'), url(./static/fonts/Ubuntu-Mono.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Ubuntu Mono';
        font-style: normal;
        font-weight: 700;
        src: local('Ubuntu Mono Bold'), local('UbuntuMono-Bold'), url(./static/fonts/Ubuntu-Mono-Lat-Ext.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }   
      .noise {
        position: absolute;
        top: -500px;
        right: -500px;
        bottom: -500px;
        left: -500px;
        background: transparent url(./static/noise.png) 0 0;
        background-size: 320px 320px;
        opacity: 0.4;
        animation: noise 1s steps(8, end) infinite both;
    }
      
      
`,
                        }}
                    />
                </Head>
                <Component {...pageProps} pathname={pathname} />
            </Container>
        );
    }
}
