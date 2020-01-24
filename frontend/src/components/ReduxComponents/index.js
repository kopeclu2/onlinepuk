import React from 'react';
import {
    makeStyles,
    TextField,
    Button,
  } from "@material-ui/core";
import DatePicker  from 'react-datepicker'
  
export const TextFieldNumber = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField variant={'outlined'} type={'number'} {...custom} {...input} />
)

export const TextFieldText = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField variant={'outlined'} type={'text'} label={label} {...custom} {...input} />
)

export const DateField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField variant={'outlined'} type={'datetime-local'} label={label} {...custom} {...input} />
)