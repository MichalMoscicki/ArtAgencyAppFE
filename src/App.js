import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {Welcome} from "./containers/Welcome";
import {Layout} from "./containers/Layout/Layout";

function App() {
  return (
      <HashRouter>
          <Layout>
              <Routes>
                  <Route path={""} element={<Welcome/>}/>
              </Routes>
          </Layout>
      </HashRouter>
  );
}

export default App;
