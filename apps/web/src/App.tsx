import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./Screens/Details";
import Home from "./Screens/Home";
import PackageSearch from "./Screens/PackageSearch";
import Uploaded from "./Screens/Uploaded";
import "../src/assets/stylesheets/application.sass";
import Login from "./Screens/Login/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setToken } from "./store/packageReducer";
import { useAppDispatch } from "./store";

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const configureToken = async () => {
      const token = await getAccessTokenSilently();
      console.log("setting token", token);
      dispatch(setToken(token));
    };
    configureToken();
    console.log("changed user");
  }, [user, isLoading]);

  if(isLoading) return <>Loading</>

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to={"login"} />}
        />
        <Route path="details/:id" element={<Details />} />
        <Route path="uploaded" element={<Uploaded />} />
        <Route path="search" element={<PackageSearch />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <Navigate to={"/login"} />;
};

export default App;
