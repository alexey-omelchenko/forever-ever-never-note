import React from 'react'
import {withRouter} from 'react-router-dom'
import {KintoContext} from 'app'
import {Formik, Form, Field, ErrorMessage, FormikErrors} from 'formik'
import {Button, FormGroup} from '@blueprintjs/core'

interface ICreateFormValues {
  title: string
  content: string
}

type FormErrors = FormikErrors<ICreateFormValues>

const CreatePage = props => {
  const validate = (values: ICreateFormValues): FormErrors => {
    const errors: FormikErrors<ICreateFormValues> = {}

    if (values.title.length > 200) {
      // Restrict length?
      errors.title = 'Too long titles should be shorter. Max 200'
    }

    return errors
  }

  return (
    <KintoContext.Consumer>
      {({store}) => (
        <div>
          <h1>Create Note</h1>
          <Formik
            initialValues={{title: '', content: ''}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                store.create(values)
                props.history.push('/')
                setSubmitting(false)
              }, 400)
            }}
          >
            {({isSubmitting}) => (
              <Form>
                <legend>Create Note Form</legend>
                <FormGroup>
                  <Field type="text" name="title" placeholder="Title..." />
                  <ErrorMessage name="title" component="div" />
                </FormGroup>
                <FormGroup>
                  <Field type="textarea" name="content" placeholder="Your note..." />
                  <ErrorMessage name="content" component="div" />
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

export default withRouter(CreatePage)
