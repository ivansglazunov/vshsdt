import '../imports/i18n';

import { useTheme, Grid, Typography, useMediaQuery, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import { Parallax, Background } from 'react-parallax';

import { Body } from '../imports/components/body';
import { darkTheme, theme as defaultTheme } from '../imports/theme';
import { wrapPage } from '../imports/wrap-page';
import { Spacing } from '../imports/components/spacing';
import { InsideSlide } from '../imports/components/effects';

export default wrapPage(() => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <Slide left>
          <Paper square style={{
            background: 'black',
            width: 38,
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
          }}>

          </Paper>
        </Slide>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={11} md={10} lg={8}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <div style={{ padding: 36 }}>
                  <Typography variant="h4" component="h1" align="center">
                    #ВШ
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        С
                        <div style={{ position: 'absolute', bottom: -4, width: '100%', height: 5 }}>
                          <InsideSlide revealProps={{ top: true, delay: 1200 }}>
                            <div style={{ width: '100%', height: '100%', background: '#ffaf36' }}></div>
                          </InsideSlide>
                        </div>
                      </span>
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        Д
                        <div style={{ position: 'absolute', bottom: -4, width: '100%', height: 5 }}>
                          <InsideSlide revealProps={{ top: true, delay: 1000 }}>
                            <div style={{ width: '100%', height: '100%', background: '#cb66f5' }}></div>
                          </InsideSlide>
                        </div>
                      </span>
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        Т
                        <div style={{ position: 'absolute', bottom: -4, width: '100%', height: 5 }}>
                          <InsideSlide revealProps={{ top: true, delay: 1300 }}>
                            <div style={{ width: '100%', height: '100%', background: '#0798ff' }}></div>
                          </InsideSlide>
                        </div>
                      </span>
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={xsDown ? 12 : undefined} style={{ position: 'relative', ...(xsDown ? { left: -6 } : { top: -6 }) }}>
                <Fade ssrReveal delay={500}>
                  <div style={{ padding: 42, width: 150, textAlign: 'center', position: 'relative', overflow: 'hidden', margin: '0 auto' }}>
                    <Slide right={!xsDown} bottom={xsDown} ssrReveal delay={1000}>
                      <div style={{
                        background: '#ffaf36',
                        position: 'absolute',
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}></div>
                    </Slide>
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                    }}>
                      <img src="/static/vshsdt-plain.svg" style={{ width: '70%' }}/>
                      <Typography variant="h5" component="h5" align="center">
                        Стилистики
                      </Typography>
                      <Typography variant="body1" component="div" align="right">
                        факультет
                      </Typography>
                    </div>
                  </div>
                </Fade>
              </Grid>
              <Grid item xs={xsDown ? 12 : undefined} style={{ zIndex: 5, position: 'relative', ...(xsDown ? { left: 5 } : {}) }}>
                <div style={{ padding: 42, width: 150, textAlign: 'center', position: 'relative', margin: '0 auto' }}>
                  <Slide top={!xsDown} right={xsDown} ssrReveal delay={0}>
                    <div style={{
                      background: '#cb66f5',
                      position: 'absolute',
                      zIndex: 1,
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      boxShadow: '0 5px 15px 0 #00000052',
                    }}></div>
                  </Slide>
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                  }}>
                    <img src="/static/vshsdt-plain_animated.svg" style={{ width: '70%' }}/>
                    <Typography variant="h5" component="h5" align="center">
                      Дизайна
                    </Typography>
                    <Typography variant="body1" component="div" align="right">
                      факультет
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={xsDown ? 12 : undefined} style={{ position: 'relative', ...(xsDown ? { left: -12 } : { top: -15 }) }}>
                <Fade ssrReveal delay={500}>
                  <div style={{ padding: 42, width: 150, textAlign: 'center', position: 'relative', overflow: 'hidden', margin: '0 auto' }}>
                    <Slide left={!xsDown} top={xsDown} ssrReveal delay={1000}>
                      <div style={{
                        background: '#0798ff',
                        position: 'absolute',
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}></div>
                    </Slide>
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                    }}>
                      <img src="/static/vshsdt-plain.svg" style={{ width: '70%' }}/>
                      <Typography variant="h5" component="h5" align="center">
                      Технологий
                      </Typography>
                      <Typography variant="body1" component="div" align="right">
                        факультет
                      </Typography>
                    </div>
                  </div>
                </Fade>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Spacing size={300}/>
      </Body>
    </ThemeProvider>
  </>;
});
