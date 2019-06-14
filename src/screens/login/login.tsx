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
        <div>
          <h1>Any place in your app!</h1>
          <Formik
            initialValues={{username: '', password: ''}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
              const userpass64 = btoa(values.username + ':s3cr3t')
              controller.onLogin({
                user: values.username,
                password: btoa(values.username + ':' + values.password),
                headers: {Authorization: 'Basic ' + userpass64},
              })

              props.history.push('/home/')
              setSubmitting(false)
            }}
          >
            {({isSubmitting}) => (
              <Form>
                <legend>Login Form</legend>

                <FormGroup>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username..."
                    component={InputGroup}
                  />
                  <ErrorMessage name="username" component="div" />
                </FormGroup>
                <FormGroup>
                  <Field type="password" name="password" component={InputGroup} />
                  <ErrorMessage name="password" component="div" />
                </FormGroup>

                <Button type="submit" intent="success" text="Submit" disabled={isSubmitting} />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </KintoContext.Consumer>
  )
}

export default withRouter(LoginPage)
