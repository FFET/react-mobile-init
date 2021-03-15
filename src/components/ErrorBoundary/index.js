/**
 * @author FFET
 * @since 2021-01-06
 * @description error boundary
 */

import { PureComponent } from "react";
import img from "./img/error.svg";
import { Button } from "@components";
import "./style";
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

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="errorPage">
          <img src={img} />
          <h2>您的网络加载有延迟</h2>
          <Button onClick={() => location.reload()} type="primary">
            请点击刷新
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
