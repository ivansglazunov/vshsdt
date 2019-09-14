import React, { useContext } from 'react';

import { wrapPage } from '../imports/wrap-page';
import { useTheme, Typography } from '@material-ui/core';
import { Picture } from '../imports/packages/picture';

const ri = require('../images/sandbox.jpg?sizes[]=100,sizes[]=300,sizes[]=600,sizes[]=960,sizes[]=1280,sizes[]=1800');

export const Content = () => {
  const theme = useTheme();

  return <div>
    <Typography variant="h3">Tag picture with responsive-loader demo page</Typography>
    <Typography variant="body1">
      Here img width visible based on real image size. Just try to resize window width to see it.
    </Typography>
    <Typography variant="h4">
      How to
    </Typography>
    <Typography variant="body1">
      Somewhere, not in render, put this.
    </Typography>
    <pre><code>
      const ri = require('../images/sandbox.jpg?sizes[]=100,sizes[]=300,sizes[]=600,sizes[]=960,sizes[]=1280,sizes[]=1800');
    </code></pre>
    <Typography variant="body1">
      Each sended sizes number, will be used as media (min-width) for {"<picture> <source>"} tag.
    </Typography>
    <Typography variant="body1">
      Import our picture wrapper, who convert responsive-loader format into html.
    </Typography>
    <pre><code>
      {"import { Picture } from '../imports/packages/picture';"}
    </code></pre>
    <Typography variant="body1">
      Just put it some where.
    </Typography>
    <pre><code>
      {"<Picture images={ri.images} src={ri.src}/>"}
    </code></pre>
    <Picture images={ri.images} src={ri.src}/>
    <Typography variant="body1">
      You can send and {"<img>"} props into {"<Picture>"}
    </Typography>
    <pre><code>
      {"<Picture images={ri.images} src={ri.src} style={{ width: '100%' }}/>"}
    </code></pre>
    <Picture images={ri.images} src={ri.src} style={{ width: '100%' }}/>
  </div>;
};

export default wrapPage(Content);
