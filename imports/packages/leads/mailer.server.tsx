import * as b24 from "b24";
import rp from "request-promise";
import queryString from "query-string";
import * as _ from "lodash";
import { Email, Item, Image, Span, A, renderEmail } from 'react-html-email';
import * as nodeMailer from 'nodemailer';

if (!process.env.LEADS_EMAILS) console.log('!process.env.LEADS_EMAILS');
if (!process.env.MAILER_USER) console.log('!process.env.MAILER_USER');
if (!process.env.MAILER_PASSWORD) console.log('!process.env.MAILER_PASSWORD');
if (!process.env.MAILER_TITLE) console.log('!process.env.MAILER_TITLE');
const leadsEmails = process.env.LEADS_EMAILS || '';
const mailerUser = process.env.MAILER_USER || '';
const mailerPassword = process.env.MAILER_PASSWORD || '';
const mailerTitle = process.env.MAILER_TITLE || '';

// https://codesandbox.io/s/q98o0pr13w
// Прототип из которого взяты исходники
import * as React from 'react';

export const template = (body) => {
  return <>
    {body}
  </>;
};

export const mailer = async (data) => {
  const { title, user, userId, location, utms } = data;
  const _utms = _.keys(utms);
  const html = renderEmail(<Email title={`${location.href} ${title}`}>
    {template(
      <Item align="left">
        <Span fontSize={24}>
          Лид
        </Span>
        <br/>
        <Span fontSize={16}>
          Полное имя: {user.fullname}
          .<br />
          Телефон: {user.phone}
          .<br />
          Email: {user.email}
          .<br />
          Href: {location.href}
          .<br />
          Комментарий: {user.comment}
          <br />
          ProductId: {location.pathname}
          <br />
          <A href={`https://metrika.yandex.ru/stat/visitors?period=week&filter=(EXISTS+ym%3Aup%3AspecialUser+WITH+(EXISTS(ym%3Aup%3AparamsLevel1%3D%3D%2527userId%2527+and+ym%3Aup%3AparamsLevel2%3D%3D%2527${userId}%2527)))&id=53888251`}>Метрика</A>
        </Span>
        <br/>
        <Span fontSize={24}>
          UTM
          <br/>
        </Span>
        <br/>
        <Span fontSize={16}>
          {_.map(_utms, (utm) => (
            <Span key={utm} fontSize={16}>
              {utm}: {utms[utm]}
              <br/>
            </Span>
          ))}
        </Span>
      </Item>
    )}
  </Email>);
  const transporter = nodeMailer.createTransport({
    host: `smtp.mailgun.org`,
    port: 587,
    secure: false,
    auth: {
      user: mailerUser,
      pass: mailerPassword,
    },
  });
  let mail = {
    from: mailerTitle, // sender address
    to: leadsEmails, // list of receivers
    subject: `${location.href} ${title}`, // Subject line
    text: `${JSON.stringify(data, null, 2)}`, // plain text body
    html: html, // html body
  };
  transporter.sendMail(mail, (error, info) => {
    if (error) console.error(error);
  });
};
