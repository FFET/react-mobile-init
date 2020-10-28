/**
 * error boundary
 */
import { PureComponent } from "react";
import Style from "./style";
class ErrorBoundary extends PureComponent {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log("====================================");
    console.log(error, info);
    console.log("====================================");
  }

  fnReload = () => {
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={Style.errorPage}>
          <h1>This Page Not Available</h1>
          <button onClick={this.fnReload}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
