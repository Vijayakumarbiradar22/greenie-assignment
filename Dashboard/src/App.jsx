import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes  }  from 'react-router-dom';
import UserLogin from './componets/UserLogin';
import AccountCreate from './componets/AccountCreate';
import UserDetails from './componets/UserDetails';
function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserLogin/>} />
      <Route path='/register' element={<AccountCreate /> } />
      <Route path='details' element={<UserDetails />} />
     </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
