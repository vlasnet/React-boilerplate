import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DateInput from "../DateInput";
import PropTypes from 'prop-types';
import styles from './index.module.css';

const initialData = {
  email: '',
  username: '',
  pass: '',
  passConfirmation: '',
  date: Date.now(),
};

const validateEmail = value => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validateUsername = value => {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  } else if (!(/[A-Z._-]/i.test(value) && !/[0-9!@#$%^&*()+=:;?,<>{}['"|\]\\]/.test(value))) {
    error = 'Invalid Username';
  }
  return error;
};

const FormikForm = props => {
  return (
    <div>
      <h3>Formik form:</h3>
      <Formik
        initialValues = { initialData }
        onSubmit = {(values, actions) => {
          console.table(values);
          actions.setStatus({ msg: 'Data was successfully send!' });
        }}
        render={({ values, errors, status, touched, isSubmitting }) => (
          <Form className={styles.form} >
            <div className={styles.fieldWrapper}>
              <Field type="email" name="email" validate={validateEmail} className={styles.formField} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div className={styles.fieldWrapper}>
              <Field type="text" name="username" validate={validateUsername} className={styles.formField}/>
              <ErrorMessage name="username">
                {errorMessage => <div className={styles.error}>{errorMessage}</div>}
              </ErrorMessage>
            </div>
            <DateInput
              id ='date'
              value = {values.date}
              name = 'date'
              label = 'Choose Date: '
            />
            {status && status.msg && <div>{status.msg}</div>}
            <button type="submit" disabled={isSubmitting} className={styles.submit}>
              Submit
            </button>
          </Form>
        )}
      />

    </div>
  );
};

FormikForm.propTypes = {

};

export default FormikForm;
