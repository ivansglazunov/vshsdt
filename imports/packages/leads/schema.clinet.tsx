import SimpleSchema from 'simpl-schema';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

import { utm } from 'url-utm-params';

const axios = require('axios');

export const Rules = {
  fullname: {
    label: 'Ваше имя',
    type: String,
    optional: true
  },
  email: {
    type: String,
    label: 'E-mail',
    regEx: SimpleSchema.RegEx.EmailWithTLD,
  },
  consent: {
    type: Boolean,
    allowedValues: [true]
  },
  comment: {
    label: 'Комментарий',
    type: String,
    optional: true
  }
};

export const onSubmit = (doc, onDone) => {
  const options = {
    method: 'post',
    url: '/_webhooks/leads',
    data: {
      title: document.title,
      user: doc,
      userId: localStorage.userId,
      location: {
        href: window.location.href,
        pathname: window.location.pathname
      },
      utms: utm(window.location.href),
    }
  };
  axios(options);
  if (onDone) onDone();
};

export const Schema = new SimpleSchema(Rules);

export const Bridge = new SimpleSchema2Bridge(Schema);
