/* eslint react/prop-types: 0 */

import React from 'react'
import {withRouter} from 'react-router-dom'
import {KintoContext} from 'app'
import {Formik, Form, Field, ErrorMessage, FormikErrors} from 'formik'
import {Button, FormGroup, InputGroup} from '@blueprintjs/core'

import './login.scss'

interface ILoginFormValues {
  username: string
  password: string
}
type FormErrors = FormikErrors<ILoginFormValues>

const LoginPage = props => {
  const validate = (values: ILoginFormValues): FormErrors => {
    const errors: FormikErrors<ILoginFormValues> = {}

    if (!values.username) {
      errors.username = 'Required'
    }

    return errors
  }

  return (
    <KintoContext.Consumer>
      {({controller}) => (
        <Formik
          initialValues={{username: '', password: ''}}
          validate={validate}
          onSubmit={(values, {setSubmitting}) => {
            const userpass64 = btoa(values.username + ':' + values.password)

            localStorage.setItem('username', values.username)
            localStorage.setItem('userpass64', userpass64)

            controller.onLogin({
              user: values.username,
              password: btoa(values.username + ':' + values.password),
              headers: {Authorization: 'Basic ' + userpass64},
            })

            props.history.push('/')
            setSubmitting(false)
          }}
        >
          {({isSubmitting}) => (
            <Form className="login-form">
              <legend>Login Form</legend>

              <FormGroup>
                <Field type="text" name="username" placeholder="Username..." />
                <ErrorMessage name="username" component="div" />
              </FormGroup>
              <FormGroup>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </FormGroup>

              <Button type="submit" intent="success" text="Submit" disabled={isSubmitting} />
            </Form>
          )}
        </Formik>
      )}
    </KintoContext.Consumer>
  )
}

export default withRouter(LoginPage)
