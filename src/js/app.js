import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from 'redux/reducers'
import promiseMiddleware from 'redux-promise'
import {Provider} from 'react-redux'
import {HashRouter, Route, Switch} from 'react-router-dom'
import routers from 'router'
import 'styles/main.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(promiseMiddleware)
  )
)

const renderRouter = (routers, parentPath) => {
  let routes = []
  routers.map((r, i) => {
    if (r.children.length) {
      routes.push([...renderRouter(r.children, `${parentPath ? parentPath : ''}${r.path}`)])
    }

    if (!!r.component) {
      routes.push(<Route path={`${parentPath ? parentPath : ''}${r.path}`} key={i} exact={r.exact || false} render={(props) => <r.component {...props} />} />)
    }
  })
  return routes
}

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {
            renderRouter(routers)
          }
          <Route render={() => 404} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementsByClassName('react-root')[0]
)
