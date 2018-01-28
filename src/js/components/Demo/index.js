import React from 'react'
import './index.scss'

export class Demo extends React.Component {
  state = {}

  test = () => {
    this.props.history.push('/login')
  }

  render() {
    return <div className='root'>
      <div className='title'>这里是titles、</div>
      <div className='sub-title'>sub-title</div>
      <button onClick={this.test}>routerChange</button>
    </div>
  }
}
