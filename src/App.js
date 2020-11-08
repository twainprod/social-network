import React, { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {
  Route,
  withRouter,
  HashRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Loader from "./components/common/Loader/Loader";
import store from "./redux/redux-store";

const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const UsersContainer = lazy(() => 
  import('./components/Users/UsersContainer')
);
const Login = lazy(() =>
  import("./components/Login/Login")
);

class App extends React.Component {
  catchAllUnhandledErrors = (PromiseRejectionEvent) => {
    alert("Some error occured");
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    // ~~~~~ ВАЖНЫЙ МОМЕНТ!!! ~~~~~~
    // Если при вмонтировании компоненты добавляем addEventListener,
    // то при ее демонтировании нужно ОБЯЗАТЕЛЬНО этот ивент удалить
    // при помощи removeEventListener
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      return (
        <div className="loader">
          <Loader />
        </div>
      );
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />        
        <div className="app-wrapper-content">
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route path="/dialogs/:dialogId?" render={() => <DialogsContainer />} />
              <Route path="/users" render={() => <UsersContainer />} />
              <Route path="/news" render={() => <News />} />
              <Route path="/music" render={() => <Music />} />
              <Route path="/settings" render={() => <Settings />} />
              <Route path="/login" render={() => <Login />} />

              <Redirect exact from="/" to="/profile" />
              <Route path="/*" render={() => <div>404 NOT FOUND</div>} />
            </Switch>
        </Suspense>
        </div>       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const TwainApp = (props) => {
  return (
    <HashRouter /* basename={process.env.PUBLIC_URL}*/>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default TwainApp;
