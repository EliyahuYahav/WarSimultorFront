import { FC } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SingUp from "./components/SingUp/SingUp";
import PrivateRoute from "./components/PraivetRoute/PraivetRoute";
import AttackPage from "./components/AttackPage/AttackPage";
import DefendPage from "./components/DefendPage/DefendPage";

const App: FC = () => {
  return (
      <>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<SingUp />} path="/SingUp" />
        <Route
          element={
            <PrivateRoute>
               <AttackPage/>
            </PrivateRoute>
          }
          path="/attack"
        />
        <Route
          element={
            <PrivateRoute>
               <DefendPage/>
            </PrivateRoute>
          }
          path="/defend"
        />
        <Route element={<Login />} path="*" />
      </Routes>
    </>
  )
}

export default App