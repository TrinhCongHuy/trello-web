import { BrowserRouter as Router } from 'react-router-dom';
import AllRoute from '~/routes';

const App = () => {
  return (
    <>
      <Router>
        <AllRoute />
      </Router>
    </>
  )
}

export default App