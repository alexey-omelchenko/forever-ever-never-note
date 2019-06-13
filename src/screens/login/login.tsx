import React from 'react'
import {Formik, Form, Field, ErrorMessage, FormikErrors} from 'formik'

interface ILoginFormValues {
  username: string
  password: string
}
type FormErrors = FormikErrors<ILoginFormValues>

const LoginPage = () => {
  const validate = (values: ILoginFormValues): FormErrors => {
    const errors: FormikErrors<ILoginFormValues> = {}

    if (!values.username) {
      errors.username = 'Required'
    }

    return errors
  }

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{username: '', password: ''}}
        validate={validate}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="text" name="username" placeholder="Username..." />
            <ErrorMessage name="username" component="div" />

            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
