
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import Profile from './components/Profile'

const App = () => {
  return (
    <>
      <NavBar />
      <Profile />
    </>
  );
}

export default App;