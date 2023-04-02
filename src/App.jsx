import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";

import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const getDesignTokens = (mode) => ({
  typography: {
    fontFamily: `"Oswald", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: orange,
          secondary: grey,
          divider: grey[700],
          bg: {
            paper: grey[300],
            heading: grey[900],
            body: grey[50],
          },

          text: {
            primary: grey[900],
            custom: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: orange,
          secondary: orange,
          divider: grey[700],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[900],
          },
        }),
  },
});

export default function App() {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
    useAuth0();
  const [mode, setMode] = React.useState("light");

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`Sending user authentication to backend....`);
      (async () => {
        const token = await getAccessTokenSilently();
        await axios.post(
          `${serverUrl}user`,
          {
            user_id: user.sub,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })();
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {!isLoading ? <Home /> : null}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

// const App = () => {
//   const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

//   useEffect(() => {
//     if(isAuthenticated){
//       console.log(`Sending user authentication to backend....`);
//       (async () => {
//         const token = await getAccessTokenSilently()
//         const response = await axios.post(`${serverUrl}user`,
//         {
//           user_id: user.sub
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         })
//       })()
//     }
//   }, [isAuthenticated]);

//   return (
//     <BrowserRouter>
//     <ThemeProvider theme={THEME}>
//       {!isLoading ? <Home /> : null}
//     </ThemeProvider>
//     </BrowserRouter>
//   )
// }

// export default App;
