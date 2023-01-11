import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";
import "./App.css";
import useDarkMode from "./hooks/useDarkMode";
import { THEME, ThemeEnum } from "./theme";
import HomePage from "./pages/HomePage";

const App = () => {
  const { isDarkMode } = useDarkMode();
  const mode = isDarkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT;

  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle mode={mode} />
      <HomePage />

      {/* <Button mode={mode} variant="primaryLight">
        hi
      </Button>
      <Input mode={mode} aria-label="Sample" placeholder="Hello" />
      <Text mode={mode} as="h1" variant="h1">
        Hello
      </Text>
      <Text mode={mode} as="h2" variant="h2">
        Hello
      </Text>
      <Text mode={mode} as="h3" variant="h3">
        Hello
      </Text>
      <Text mode={mode} as="h4" variant="h4">
        Hello
      </Text>
      <Text mode={mode} as="h5" variant="h5">
        Hello
      </Text>
      <Text mode={mode} as="h6" variant="h6">
        Hello
      </Text>
      <Text mode={mode} variant="sub">
        Hello
      </Text>
      <Text mode={mode} variant="code">
        Hello
      </Text>
      <Avatar width="40px" height="40px" />
      <Avatar width="40px" height="40px">
        <AvatarStatus />
      </Avatar>
      <Icon icon="Question" color="white" height="40px" width="40px" /> */}
    </ThemeProvider>
  );
};

export default App;
