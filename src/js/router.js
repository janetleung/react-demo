import {Demo} from 'components/Demo'

export default [
  {
    path: '/index',
    component: Demo,
    exact: true,
    children: []
  }, {
    path: '/dashboard',
    component: Demo,
    exact: true,
    children: [
      {
        path: '/demo',
        component: Demo,
        children: [{
          path: '/test',
          component: Demo,
          children: []
        }]
      }
    ]
  }
]
