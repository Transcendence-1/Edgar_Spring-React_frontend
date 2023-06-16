import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Home, Profile, SignIn, SignUp } from "@/pages"
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SignIn />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
