import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleThought from './pages/SingleThought'


// creates link to the graphql
const httpLink = createHttpLink({
  uri: '/graphql'
});

// creates connection to the API endpoint and instantiate a new cache object
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              {/* ? in profile/:username? means the parameter is optional */}
              <Route exact path='/profile/:username?' component={Profile} />
              <Route exact path='/thought/:id' component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
