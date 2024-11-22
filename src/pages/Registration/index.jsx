import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Kurwa Bober',
      email: "test123@gmail.com",
      password: "12345",
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      return alert("Не вдалось зареєструватись")
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }

    if (isAuth) {
      <Navigate to="/" />
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField error={Boolean(errors.fullName?.message)} helperText={errors.fullName?.message} className={styles.field} {...register("fullName", {required: 'Вкажіть імя'})} label="Повне імя" fullWidth />
      <TextField error={Boolean(errors.email?.message)} helperText={errors.email?.message} className={styles.field} {...register('email', {required: ''})} label="E-Mail" fullWidth />
      <TextField error={Boolean(errors.password?.message)} helperText={errors.password?.message} className={styles.field} {...register('password', {required: ''})} label="Пароль" fullWidth />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
