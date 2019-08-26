import React from 'react';
import { Body } from '../imports/components/body';
import { theme as defaultTheme, darkTheme, goldTheme, goldColor } from '../imports/theme';
import { ThemeProvider } from '@material-ui/styles';
import { Typography, Paper, Grid, List, ListItem, useTheme } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Flip from 'react-reveal/Flip';
import moment from 'moment';

import '../imports/i18n';

import { Header } from '../imports/components/header';
import { Spacing } from '../imports/components/spacing';
import { Line, Title } from '../imports/components/heading';
import { Partners } from '../imports/components/partners';
import { Container } from '../imports/components/container';
import { OuterLink } from '../imports/components/links';

const start = new Date(2019, 8, 11, 18, 30);
const end = new Date(2019, 8, 11, 19);

export default () => {
  const theme = useTheme();

  return <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <ThemeProvider theme={darkTheme}>
          <Header/>
        </ThemeProvider>
        <Spacing size={5}/>
        <Container>
          <Typography variant="h5">Кто проводит мероприятие:</Typography>
          <Typography variant="body1">- Эксперты из индустрии - наши преподаватели</Typography>
          <Typography variant="body1">- Кураторы основных курсов</Typography>
          <Typography variant="body1">- Выпускники нашей школы</Typography>
        </Container>
        <Spacing size={5}/>
        <Container>
          <Typography variant="h5">Кто проводит мероприятие:</Typography>
          <Typography variant="body1">- Эксперты из индустрии - наши преподаватели</Typography>
          <Typography variant="body1">- Кураторы основных курсов</Typography>
          <Typography variant="body1">- Выпускники нашей школы</Typography>
        </Container>
        <Spacing size={5}/>
        <Container>
          <Typography variant="h5">Мы расскажем о программах:</Typography>
          <Typography variant="body1">- Имиджмейкер - второе высшее</Typography>
          <Typography variant="body1">- Модульных курсах для работы  в индустрии моды: фешн журналистика, психология моды, история моды и многое другое. </Typography>
        </Container>
        <Spacing size={5}/>
        <Container>
          <Typography variant="h5">Для кого мероприятие:</Typography>
          <Typography variant="body1">- Выпускники колледжей</Typography>
          <Typography variant="body1">- Выпускники ВУЗов</Typography>
          <Typography variant="body1">- Профессионалы индустрии</Typography>
          <Typography variant="body1">- Предприниматели</Typography>
          <Typography variant="body1">- Старт карьеры </Typography>
        </Container>
        <Spacing size={10}/>
        <Line>
          <Title>Ждем вас!</Title>
        </Line>
        <ThemeProvider theme={darkTheme}>
          <Paper square>
            <Spacing size={10}/>
            <Container>
              <Typography variant="body1"><b>ВШСДТ</b> это школа, совмещающая авторские методики и классическую академическую базу. Более 1 000 студентов получили свое призвание, открыли свой бизнес, ателье, шоурумы, фотостудии и стали стилистами и продолжают свой путь.</Typography>
              <Spacing size={2}/>
              <Typography variant="body1">В стенах школы вы получите: </Typography>
              <Typography variant="body1">- <b>диплом</b> государственного образца</Typography>
              <Typography variant="body1">- <b>сертификат</b> о прохождении модульных программ</Typography>
              <Typography variant="body1">- <b>практика</b> с первых дней занятий </Typography>
              <Typography variant="body1">- <b>преподавательских состав</b> - эксперты индустрии</Typography>
              <Typography variant="body1">- <b>кураторство</b> и внимательное отношение к развитию студентов в професиии  </Typography>
              <Typography variant="body1">- <b>программы</b> которые дадут новые горизонты для работы </Typography>
              <Typography variant="body1">- <b>трудоустройство</b> и участие во время учебы и после, в известных проектах России </Typography>
            </Container>
            <Spacing size={8}/>
          </Paper>
        </ThemeProvider>
        <Line>
          <Title>Партнеры</Title>
        </Line>
        <Spacing size={10}/>
        <Partners/>
        <Spacing size={4}/>
        <ThemeProvider theme={darkTheme}>
          <Paper square>
            <Container>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} md={6}>
                  <Spacing size={2}/>
                  <ThemeProvider theme={goldTheme}>
                    <Typography variant="h5">{moment(start).format('Do MMMM HH:mm')}</Typography>
                  </ThemeProvider>
                  <Typography variant="body2">Сбор гостей 30 минут</Typography>
                  <Spacing size={2}/>
                  <Typography variant="h5">метро Алексеевская</Typography>
                    <Typography variant="body1">
                      <OuterLink href="https://yandex.ru/maps/-/CGCDQ2yL">Проспект Мира 101, 6 этаж, кабинет 600</OuterLink>
                      <img src={require('../images/logo-yandex-maps.png?resize&size=50')} style={{ height: '1.1em', position: 'relative', left: 10, top: '0.2em' }}/>
                    </Typography>
                  <Spacing size={2}/>
                  <Typography variant="h6">На входе действует пропускная система</Typography>
                  <List>
                    <ListItem><ExpandMore style={{ color: goldColor }}/>входе в левое окно, даете паспорт</ListItem>
                    <ListItem><ExpandMore style={{ color: goldColor }}/>говорите "Высшая Школа Стилистики"</ListItem>
                    <ListItem><ExpandMore style={{ color: goldColor }}/>Правый лифт 6 этаж</ListItem>
                  </List>
                  <Spacing size={2}/>
                  <Typography variant="body1">Парковка: только вокруг здания. </Typography>
                  <Spacing size={2}/>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img src={require('../images/map.jpg?resize&size=500')} style={{ width: '100%' }}/>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </ThemeProvider>
      </Body>
    </ThemeProvider>
  </>;
};
