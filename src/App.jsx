import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const {saveItem, getItem, deleteItem} = useLocalStorage("user");
  const userid = getItem();
  const [user, setUser] = useState(userid);
  

  if(!user){
    return (<Login setUser = {setUser} saveUser = {saveItem}/>)
  }
  const logout = () => {
    deleteItem();
    setUser(null);
  }
  return(
    <BrowserRouter >
      {!!user && <Navbar onLogout = {logout} />}
      <Routes>
          <Route exact path="/" element={<Home username={user.username}/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="*" render={() => <h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App