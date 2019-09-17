import { makeStyles, Theme, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
// import { Draw } from '../draw';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
}));

export const ScreenOne = ({
  ...props
}) => {
  const classes = useStyles({});
  // const theme = useTheme();
  // const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return <>
    
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={6}
      >
        <Grid item xs={4}>
          <Typography variant="h4" component="h1" align='center'>СТИЛИСТИКИ</Typography>
          <Typography variant="h6" component="h2" align='right'>факультет</Typography>
        </Grid>
        <Grid item xs={5}>
          <div>
            <svg
              width="100%"
              // height="0"
              viewBox="0 0 100 100"
              >
              <defs>
                <clipPath id="myClip">
                <g transform="translate(0,-197)">
                  <path
                    fill="#EDEBEA"
                    d="m 51.641549,197 c 3.838732,3.62456 9.804493,11.01268 9.995083,22.06749 0.276767,16.05223 -9.343538,25.1975 -15.503172,32.96117 -8.275616,10.43064 -11.727307,23.16574 -11.964983,24.05496 -0.07747,0.21203 -0.269574,0.80423 -0.269574,0.80423 l -1.409659,-0.43926 c -0.278107,1.19259 -0.50779,1.9558 -0.523598,2.00654 -0.01876,0.0725 -0.146096,0.50302 -0.146096,0.50302 l 5.463908,1.70433 c -0.145865,-1.15355 -0.178149,-2.37528 -0.04516,-3.66068 0.4012,-3.87833 1.079452,-7.51644 3.30323,-11.93084 2.223776,-4.41439 5.912428,-9.60783 12.340484,-17.21654 l 0.0136,-0.0171 c 2.069713,-2.40551 5.867032,-6.02317 10.781222,-8.77971 2.096933,-4.54367 3.489533,-9.82006 3.380545,-16.14022 C 66.762822,205.83144 53.21039,197.04066 53.21039,197.04066 Z m -4.578873,2.42221 c -2.764391,1.91768 -10.183862,7.88859 -11.33847,18.08753 -1.28888,11.38501 4.519655,20.32311 9.069375,28.49477 0.694221,-0.83606 1.392318,-1.67497 2.084373,-2.52312 -3.575866,-6.56551 -6.688144,-13.57913 -5.74253,-21.93195 0.956047,-8.44526 6.699481,-13.92338 9.833918,-16.36111 1.043672,0.92102 2.379976,2.25754 3.67474,4.02163 -2.30022,-5.23012 -5.857035,-8.43861 -7.581406,-9.78775 z m 39.461747,39.4512 c 4.564244,3.8245 6.739525,10.54884 4.47043,17.3561 -1.27924,3.83774 -4.617663,7.05456 -8.807829,8.7295 -4.190165,1.67494 -9.496561,1.59458 -13.94592,-1.8213 -0.405329,-0.31118 -0.77456,-0.63812 -1.113967,-0.97692 0.714233,2.16518 1.973229,4.30536 4.189806,6.00709 4.866648,3.73625 10.805693,3.84494 15.374648,2.0186 4.568926,-1.82636 8.191334,-5.2465 9.649701,-9.62159 3.13915,-9.4174 -1.635094,-18.92887 -9.816869,-21.69148 z m -10.37461,1.42923 c -3.448916,0.007 -6.84858,1.18793 -9.946364,2.90314 -4.309994,2.38638 -7.900869,5.79633 -9.625113,7.80028 -2.592356,3.0691 -4.438868,5.48797 -6.160713,7.8038 1.780094,5.25271 3.910698,10.68893 3.504076,17.28882 -0.04469,10.02416 -7.697379,15.87165 -7.697379,15.87165 l -3.098425,-0.11597 c 0,0 -0.892621,-0.78804 -1.984973,-2.20183 1.906402,4.49893 4.976966,7.16172 4.976966,7.16172 L 51.075774,297 c 0,0 8.19828,-6.24736 8.263125,-16.98913 0.0374,-0.62765 -0.0477,-1.19282 -0.0512,-1.80022 0.882236,2.12094 1.711363,3.68427 1.711363,3.68427 l 6.635122,-4.04672 c 0,0 -4.191836,-7.40799 -2.132556,-14.15075 0.266538,-0.87279 0.637565,-1.53804 1.011051,-2.20082 -2.16988,-2.55815 -2.760894,-5.66895 -2.707357,-8.24808 -1.394008,1.44992 -2.795487,3.3118 -3.662199,6.14966 -2.290806,7.50091 2.282666,15.3345 2.282666,15.3345 l -4.145624,2.52914 c 0,0 -5.846292,-9.25475 -2.783665,-19.28283 2.889573,-9.46147 11.059855,-12.57392 11.059855,-12.57392 l 3.054759,3.27664 c 0,0 -0.808027,1.83529 -0.974923,4.1401 -0.166857,2.30481 0.193931,4.64342 2.56329,6.46242 1.280484,0.98306 2.585497,1.54746 3.88507,1.79118 -1.022485,-1.25155 -1.148075,-2.66477 -1.031636,-4.27314 0.146174,-2.01877 0.851927,-3.64662 0.851927,-3.64662 l -4.301261,-4.61249 c 0.09876,-0.0563 0.170131,-0.13269 0.269578,-0.18776 3.077296,-1.70385 6.368478,-2.80315 9.636645,-2.71539 1.089399,0.0292 2.176379,0.18999 3.252061,0.50503 1.084765,0.31772 2.092736,0.88098 2.95634,1.64359 -0.897245,-3.42971 -3.402218,-6.00589 -6.512107,-6.91673 -1.349486,-0.39525 -2.706686,-0.57201 -4.056279,-0.56929 z m -46.05517,0.0125 c 0.45862,0.31429 0.906625,0.63311 1.330339,0.95734 4.923114,3.76729 7.814838,8.14516 7.814838,8.14516 l -4.046742,2.68878 c 0,0 -2.507077,-3.7523 -6.720442,-6.97647 -4.213374,-3.22417 -9.747558,-5.74517 -16.296851,-3.75155 -3.3948461,1.03341 -5.360802,3.04115 -6.369542,5.54072 -1.00874,2.49958 -0.9791835,5.57378 0.191768,8.53021 1.3098336,3.30706 3.8243733,5.2893 6.757098,5.8108 -0.569577,-0.68813 -1.056003,-1.51157 -1.436763,-2.47291 -1.047412,-2.64451 -1.049315,-5.33613 -0.197292,-7.44737 0.852026,-2.11125 2.424042,-3.77384 5.441321,-4.69232 1.498343,-0.45611 2.935731,-0.6555 4.30928,-0.65061 1.238605,0.005 2.419625,0.18462 3.549734,0.49198 l 0.02308,-0.0331 c 0,0 1.725455,0.19878 3.622025,1.25603 1.896571,1.05726 4.17915,3.03548 5.856995,6.4077 0.881203,1.77112 1.372595,3.61422 1.717376,5.45688 1.625668,-3.12582 3.518827,-6.30922 5.881584,-9.44337 -0.512986,-0.95362 -1.076682,-1.94671 -1.66518,-2.97393 -1.042769,-1.04068 -2.202749,-2.1116 -3.58285,-3.16769 -1.760068,-1.34685 -3.842428,-2.65197 -6.179788,-3.67625 z m -2.312778,13.36811 c 0.02185,0.40933 0.08801,0.78387 0.07179,1.21437 -0.0736,1.95611 -0.620364,4.1893 -2.107952,6.16823 -1.4876,1.97893 -3.860255,3.60075 -7.160714,4.57083 C 13.245348,267.20611 7.5779167,265.53051 4,261.4022 c 0.031184,0.0818 0.059064,0.16445 0.091365,0.24599 3.051774,7.70512 11.329152,11.47731 18.869163,9.26114 3.531868,-1.03811 6.21834,-2.83439 7.915743,-5.09242 0.08086,-0.10757 0.156222,-0.21651 0.231918,-0.32531 0.147176,-3.10876 -0.163163,-6.45544 -1.533136,-9.20893 -0.565417,-1.1364 -1.183215,-1.93393 -1.79319,-2.59942 z m 19.170881,10.24157 c -0.68062,1.10037 -1.597499,2.38635 -2.073822,3.33186 -1.936682,3.84448 -2.429385,6.58162 -2.808271,10.24408 -0.440905,4.26215 1.396009,7.08295 2.810272,8.83794 0.78919,-0.81069 1.757779,-1.92959 2.566301,-3.44983 -0.02137,-0.44248 -0.01156,-0.89778 0.03662,-1.36397 0.289387,-2.7975 0.621517,-4.91257 1.623505,-7.44134 -0.08627,-3.47972 -1.044703,-6.77284 -2.154638,-10.15874 z"
                  />
                </g>
                </clipPath>
              </defs>
              <image href='/static/main.jpg' x="0" y="0" height="700" width="600" style={{clipPath: 'url(#myClip)'}} />
            </svg>
            <svg viewBox="0 0 500 500" width="100%" >
              <defs>
                <clipPath id="svgPath">
                  <path fill="#EDEBEA" d="M468.855,234.292H244.117V9.439L468.855,234.292z" />
                  <path fill="#EDEBEA" d="M6.864,8.939h224.73v224.733L6.864,8.939z" />
                  <path fill="#EDEBEA" d="M244.118,469.73V245.005h224.737L244.118,469.73z" />
                  <path fill="#EDEBEA" d="M231.594,245.005V469.73H6.863L231.594,245.005z" />
                </clipPath>
              </defs>
              <image href="/static/main.jpg" x="0" y="0" height="500" width="700" style={{clipPath: 'url(#svgPath)'}}/>
            </svg>
            
          </div>
          <div>
            <Typography variant='body1' component="p">
            о факультете о факультете о факультете о факультете
            о факультете о факультете о факультете о факультете
            </Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemText primary="Ближайщие курсы"/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Команда"/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Отзывы"/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Контакты"/>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  </>;
};
