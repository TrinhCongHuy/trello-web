import { useRoutes } from 'react-router-dom'
import publicRoutes from './publicRoutes'


const AllRoute = () => {
  const routes = [
    ...publicRoutes,
  ]
  const element = useRoutes(routes)
  return <>{element}</>
}

export default AllRoute
