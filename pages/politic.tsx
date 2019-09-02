import React, { useContext } from 'react';

import { Contract } from '../imports/packages/leads/politic.client';
import { wrapPage } from '../imports/wrap-page';

export const Content = () => {
  return <div>
    <Contract/>
  </div>;
};

export default wrapPage(Content);