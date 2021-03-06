import React, {Component} from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import './react-mde-all.scss'
import {KintoContext} from 'app'
import {Formik, Form, Field, ErrorMessage, FormikErrors} from 'formik'
import {Button, FormGroup} from '@blueprintjs/core'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import './edit.scss'

export interface IState {
  value: string
  tab: 'write' | 'preview'
}

export interface IProps {
  isNew: boolean
  note: any
  defaultMode: 'write' | 'preview'
  history: any
}

interface ICreateFormValues {
  title: string
  content: string
}

type FormErrors = FormikErrors<ICreateFormValues>

class EditNodePage extends Component<IProps, IState> {
  converter: Showdown.Converter

  static defaultProps = {
    isNew: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '**Hello world!!!**',
      tab: 'write',
    }
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    })
  }

  componentDidMount() {
    this.setState({
      value: !this.props.isNew && this.props.note ? this.props.note.content : '',
      tab: this.props.defaultMode,
    })
  }

  handleValueChange = (value: string) => {
    this.setState({value})
  }

  handleTabChange = (tab: 'write' | 'preview') => {
    this.setState({tab})
  }

  render() {
    const validate = (values: ICreateFormValues): FormErrors => {
      const errors: FormikErrors<ICreateFormValues> = {}

      if (values.title.length < 4) {
        errors.title = 'Too short titles should be longer. Min 4'
      }

      if (values.title.length > 200) {
        // Restrict length?
        errors.title = 'Too long titles should be shorter. Max 200'
      }

      return errors
    }

    return (
      <div className="edit-note-page">
        <KintoContext.Consumer>
          {({store}) => (
            <div>
              <h1>{this.props.isNew ? 'Create Note' : 'Edit Note'}</h1>
              <Formik
                initialValues={{
                  title: !this.props.isNew && this.props.note ? this.props.note.title : '',
                }}
                validate={validate}
                onSubmit={(values, {setSubmitting}) => {
                  if (this.props.isNew) {
                    store.create({
                      title: values.title,
                      content: this.state.value,
                      created_at: moment().unix(),
                      updated_at: moment().unix(),
                    })
                  } else {
                    store.update({
                      id: this.props.note.id,
                      title: values.title,
                      content: this.state.value,
                      updated_at: moment().unix(),
                    })
                  }
                  setSubmitting(false)
                  this.props.history.replace('/')
                }}
              >
                {({isSubmitting}) => (
                  <Form className="form">
                    <FormGroup>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Title..."
                        className="bp3-input"
                      />
                      <ErrorMessage name="title" component="div" className="error-msg" />
                    </FormGroup>
                    <FormGroup>
                      <ReactMde
                        onChange={this.handleValueChange}
                        onTabChange={this.handleTabChange}
                        value={this.state.value}
                        generateMarkdownPreview={markdown =>
                          Promise.resolve(this.converter.makeHtml(markdown))
                        }
                        selectedTab={this.state.tab}
                      />
                    </FormGroup>

                    <Button type="submit" intent="success" text="Submit" disabled={isSubmitting} />
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </KintoContext.Consumer>
        {this.props.isNew === false && this.props.note && (
          <div>
            {this.props.note.created_at && (
              <div>Created At: {moment.unix(this.props.note.created_at).format('LLL')}</div>
            )}
            {this.props.note.updated_at && (
              <div>Updated At: {moment.unix(this.props.note.updated_at).format('LLL')}</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(EditNodePage)
