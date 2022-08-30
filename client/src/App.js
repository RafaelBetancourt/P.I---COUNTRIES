
import { Provider } from "react-redux";
import { Route, Routes, } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";
import Activities from "./components/Activities";
import NavBar from "../src/components/NavBar";



function App() {

  return (
    <> 
      <Routes>
        <Route exact path={'/'} element={<LandingPage/>}/>
        <Route path={'/countries'} element={<NavBar/>}>
          <Route path={''} element={<Countries/>}/>
          <Route path={':idDetail'} element={<CountryDetail/>}/>
          <Route path={'activities'} element={<Activities/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;


