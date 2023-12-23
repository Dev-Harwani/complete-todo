
import './App.css'
import SignUp from './SignUp'
import AppBar from "./AppBar.jsx";
import LogIn from "./LogIn.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Addtodo from "./Addtodo.jsx"
import AllTodos from "./Alltodos.jsx";


function App() {

  return (

        <div>

            <BrowserRouter>
                <AppBar></AppBar>
                <Routes>
                        <Route path={'/login'} element={<LogIn />} />
                        <Route path={'/signup'} element={<SignUp />} />
                        <Route path={'/Addtodo'} element={<Addtodo />} />
                        <Route path={"/alltodos"} element={<AllTodos />}  />
                </Routes>
            </BrowserRouter>
        </div>

  )
}

export default App
