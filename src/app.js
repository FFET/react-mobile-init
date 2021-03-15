/**
 * react root component
 */
import { Provider } from "react-redux";
import createStore from "./store";
import App from "./containers";
import { hot } from "react-hot-loader/root";
import ErrorBoundary from "@components/ErrorBoundary";
import "./styles";

const store = createStore();

function Index() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  );
}

export default hot(Index);
