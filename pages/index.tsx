import '../imports/i18n';

import { useTheme, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

import { Body } from '../imports/components/body';
import { darkTheme, theme as defaultTheme } from '../imports/theme';
import { wrapPage } from '../imports/wrap-page';
import { Spacing } from '../imports/components/spacing';
import { Parallax, Background } from 'react-parallax';

export default wrapPage(() => {
  const theme = useTheme();

  return <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={11} md={10} lg={8}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <div style={{ padding: 36 }}>
                  <Typography variant="h4" component="h1" align="center">
                    #ВШ<span style={{ borderBottom: '4px solid #ffaf36' }}>С</span><span style={{ borderBottom: '4px solid #cb66f5'}}>Д</span><span style={{ borderBottom: '4px solid #0798ff' }}>Т</span>
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item style={{ position: 'relative', top: -6 }}>
                <Fade ssrFadeout delay={500}>
                  <div style={{ padding: 42, width: 150, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <Slide right ssrFadeout delay={1000}>
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
              <Grid item style={{ zIndex: 5 }}>
                <div style={{ padding: 42, width: 150, textAlign: 'center', position: 'relative' }}>
                  <Slide top ssrFadeout delay={0}>
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
              <Grid item style={{ position: 'relative', top: -15 }}>
                <Fade ssrFadeout delay={500}>
                  <div style={{ padding: 42, width: 150, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <Slide left ssrFadeout delay={1000}>
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
        <Spacing size={30}/>
      </Body>
    </ThemeProvider>
  </>;
});
