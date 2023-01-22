import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='home__btn' onClick={() => loginWithRedirect()}>Login</button>;
};

export default Login;
