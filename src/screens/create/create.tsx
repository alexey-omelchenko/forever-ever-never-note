import React from 'react'
import {KintoContext} from 'app'
import {Formik, Form, Field, ErrorMessage, FormikErrors} from 'formik'

interface ICreateFormValues {
  title: string
  content: string
}

type FormErrors = FormikErrors<ICreateFormValues>

const CreatePage = () => {
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
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
            {({isSubmitting}) => (
              <Form>
                <Field type="text" name="title" placeholder="Title..." />
                <ErrorMessage name="title" component="div" />
                <br />
                <Field type="textarea" name="content" placeholder="Your note..." />
                <ErrorMessage name="content" component="div" />

                <button type="submit" disabled={isSubmitting}>
                  {' '}
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

export default CreatePage
