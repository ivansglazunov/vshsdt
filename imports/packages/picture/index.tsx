import React, { useContext } from 'react';

import { useTheme } from '@material-ui/core';
import _ from 'lodash';

export const Picture = ({
  images,
  src,
  ...props
}: {
  images: { path: string; width: number; height?: number; type?: string }[];
  src: string;
  [key: string]: any;
}) => {
  const theme = useTheme();

  return <picture>
    {images.map((image, i) => {
      return <source key={i} srcSet={image.path} media={`(min-width: ${image.width}px)`} type={image.type || 'image/jpeg'}/>
    })}
    <img src={src} {...props}/>
  </picture>;
};

export default Picture;
