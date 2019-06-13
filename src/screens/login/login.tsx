/* eslint react/prop-types: 0 */

import React from 'react'
import {withRouter} from 'react-router-dom'
import {KintoContext} from 'app'
import {Formik, Form, Field, ErrorMessage, FormikErrors} from 'formik'
import {Button} from '@blueprintjs/core'

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
                <Field type="text" name="username" placeholder="Username..." />
                <ErrorMessage name="username" component="div" />

                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />

                <Button type="submit" intent="success" text="Submit" disabled={isSubmitting} />

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </KintoContext.Consumer>
  )
}

export default withRouter(LoginPage)
