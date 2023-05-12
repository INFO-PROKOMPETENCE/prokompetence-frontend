import { Provider } from "react-redux";
import { store } from "./redux-store/store-manager";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./components/routing";
import "./styles/primary-styles.scss";
import { ThemeProvider } from "@mui/material";
import { THEME } from "./mui.settings";

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
