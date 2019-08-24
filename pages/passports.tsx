import * as React from 'react';

import { TextField, Grid, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useGql } from '../imports/use-gql';
import { usePassport } from '../imports/packages/passports/react';

const Form = () => {
  const { token, signin, signout } = usePassport();
  const { t, i18n } = useTranslation();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = async () => {
    setLoading(true);
    const { error } = await signin(username, password);
    setLoading(false);
    setError(error);
  };

  return <Grid container spacing={1} justify="center" alignItems="center">
    <Grid item xs={12}>
      <TextField
        label={t('username')}
        value={username}
        disabled={Boolean(token)}
        autoFocus={!username && !loading}
        onChange={e => setUsername(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && submit()}
        error={error === '!node'}
        variant="outlined"
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label={t('password')}
        value={password}
        disabled={Boolean(token)}
        autoFocus={!password && error === '!password' && !loading}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && submit()}
        error={error === '!password'}
        variant="outlined"
        fullWidth
        type="password"
      />
    </Grid>
    <Grid item xs={12}>
      <Button
        variant="outlined"
        fullWidth
        disabled={Boolean(token || loading)}
        onClick={submit}
      >{t('submit')}</Button>
    </Grid>
    <Grid item xs={12}>
      <Button
        variant="outlined"
        fullWidth
        disabled={!token}
        onClick={() => signout()}
      >{t('signout')}</Button>
    </Grid>
  </Grid>;
};

const Content = () => {
  return <>
    <div style={{ padding: 16 }}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Form/>
        </Grid>
      </Grid>
    </div>
  </>;
};

export default () => {
  return <Content/>;
};
