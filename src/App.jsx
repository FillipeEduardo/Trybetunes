import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

const THREE_CHARACTERS = 3;

class App extends React.Component {
  state = {
    nome: '',
    isButtonDisabled: true,
    isLoading: false,
    redirecionar: false,
  };

  handlerButton = () => {
    const { nome } = this.state;
    if (nome.length >= THREE_CHARACTERS) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  login = () => {
    const { nome } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: nome });
      this.setState({
        isLoading: false,
        redirecionar: true,
      });
    });
  };

  handlerChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => {
      this.handlerButton();
    });
  };

  render() {
    const { nome, isButtonDisabled, isLoading, redirecionar } = this.state;
    return (
      <Switch>
        <Route exact path="/">
          <Login
            handlerChange={ this.handlerChange }
            nome={ nome }
            isButtonDisabled={ isButtonDisabled }
            login={ this.login }
            isLoading={ isLoading }
            redirecionar={ redirecionar }
          />
        </Route>
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
