import React, { useContext } from 'react';

import { useTheme } from '@material-ui/core';
import _ from 'lodash';

export const Picture = ({
  images,
  src,
  ...props
}: {
  images: { path: string; width: number; height: number }[];
  src: string;
  [key: string]: any;
}) => {
  const theme = useTheme();

  return <picture>
    {_.reverse(images).map((image, i) => {
      return <source key={i} srcSet={image.path} type="image/jpeg" media={`(min-width: ${image.width}px)`}/>
    })}
    <img src={src} {...props}/>
  </picture>;
};

export default Picture;
