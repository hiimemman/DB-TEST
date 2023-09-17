import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import  Login  from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageUser from "./pages/ManageUser";

function App() {

  return (
    <Router>
      <Routes>
        <Route path ="/" element ={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path ="/users" element ={<ManageUser />} />
      </Routes>
    </Router>
  )
}

export default App;
