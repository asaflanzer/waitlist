import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
// import io from 'socket.io-client';

// //SERVER DOMAIN
// const socket = io('http://localhost:8000/');

// socket.on('new connection', (data) => {
//   console.log(data);
// });

const initialValues = {
  name: '',
  email: '',
  phNumber: '',
};

const savedValues = {
  name: 'Asaf',
  email: 'asaflanzer@gmail.com',
  phNumber: '0545850206',
};

const onSubmit = (values, onSubmitProps) => {
  console.log('onSubmit values', values);
  socket.emit('new queue', values);

  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  phNumber: Yup.string().required('Required'),
});

// const validateComments = (value) => {
//   let error;

//   if (!value) {
//     error = 'Required';
//   }
//   return error;
// };

const FormikForm = () => {
  const [formValues, setFormValues] = useState(null);

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        return (
          <Form>
            <h1>Join the Queue</h1>

            <div className='form-control'>
              <Field type='text' id='name' name='name' placeholder='Name' />
              <ErrorMessage name='name' component={TextError} />
            </div>

            <div className='form-control'>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='john@doe.com'
              />
              <ErrorMessage name='email'>
                {(errorMsg) => {
                  return <div className='error'>{errorMsg}</div>;
                }}
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <Field
                type='text'
                id='phNumber'
                name='phNumber'
                placeholder='Phone Number'
              />
              <ErrorMessage name='phNumber' component={TextError} />
            </div>

            <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type='reset'>Reset</button>
            <button
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Join Queue
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikForm;
