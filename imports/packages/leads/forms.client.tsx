import React, { useState, useEffect } from 'react';

import AutoForm from 'uniforms-material/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import SubmitField from 'uniforms-material/SubmitField';
// import TextField from "uniforms-material/TextField";
import BoolField from 'uniforms-material/BoolField';
import ErrorField from 'uniforms-material/ErrorField';

import Grid from '@material-ui/core/Grid';

import { Schema, onSubmit } from './schema.clinet';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
}));

export const Form = ({
  politic = '/politic',
  onDone = null,
  needComment = true,
}) => {
  const classes = useStyles({});

  let timeout;
  useEffect(() => () => clearTimeout(timeout));
  const [disabled, setDisabled] = useState(false);

  return (
    <AutoForm
      schema={Schema}
      onSubmit={doc => {
        setDisabled(true);
        onSubmit(doc, onDone);
        timeout = setTimeout(() => setDisabled(false), 5000);
      }}
      disabled={disabled}
      model={{}}
    >
      <Grid container spacing={0}>
        <Grid item sm={12}>
          <AutoField name="fullname" variant="outlined" />
          <AutoField name="email" variant="outlined" />
        </Grid>
        {needComment && <Grid item xs={12}>
          <AutoField name="comment" variant="outlined" multiline/>
        </Grid>}
        <Grid item sm={12}>
          <BoolField
            name="consent"
            label={
              <span>
                Я даю согласие на обработку персональных данных и соглашаюсь
                c&ensp;
                <a href={politic} target="_blank">
                  политикой конфиденциальности
                </a>
              </span>
            }
          />
          <ErrorField
            name="consent"
            errorMessage="Необходимо дать согласие на обработку персональных данных."
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <SubmitField fullWidth label="Отправить"/>
        </Grid>
      </Grid>
    </AutoForm>
  );
};
