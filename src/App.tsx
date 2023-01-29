import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ErrorBoundary } from "react-error-boundary";
import GlobalStyle from "./GlobalStyles";
import "./App.css";
import { THEME } from "./theme";
import useMode from "./hooks/useMode";
import { ModeProvider } from "./context/ModeContext";
import AllRoutes from "./routes";
import client from "./graphql/client";
import ErrorComponent from "./components/error/Error";

const ErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.error(info);
};

const App = () => {
  const { mode } = useMode();

  return (
    <ErrorBoundary FallbackComponent={ErrorComponent} onError={ErrorHandler}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={THEME}>
            <ModeProvider>
              <GlobalStyle mode={mode} />
              <AllRoutes />
            </ModeProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
