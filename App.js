
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import { Route, Routes } from 'react-router-dom'


  const App = () => {
     return (
      <div>
      <Routes>
      <Route path='/' element={<LoginPage />} />     
      <Route path='/Home'  element={<HomePage/>}/>
  
    </Routes>
    </div>
       )} 
              
   export default App