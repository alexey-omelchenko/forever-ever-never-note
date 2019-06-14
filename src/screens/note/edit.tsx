import React, {Component} from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import './react-mde-all.scss'

export interface IState {
  value: string
  tab: 'write' | 'preview'
}

export interface IProps {
  note: any
  defaultMode: 'write' | 'preview'
}

class EditNodePage extends Component<IProps, IState> {
  converter: Showdown.Converter

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
      value: this.props.note.content,
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
    return (
      <div className="container">
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
          selectedTab={this.state.tab}
        />
      </div>
    )
  }
}

export default EditNodePage
