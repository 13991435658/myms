import { useRoutes } from 'react-router-dom'
import Login from '../views/Login/Login'
import Admin from '../views/Admin/Admin'
export default function RouterIndex() {
  const route = useRoutes([
    { path: '/', element: <Login /> },
    {
      path: '/admin/*', element: <Admin />,
      children: []
    }
  ])
  return (
    <>{route}</>
  )
}
