import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import AppStore from './store/AppStore';
// import '../node_modules/toastr/build/toastr.min.css';

injectTapEventPlugin();

const store = AppStore();
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>, document.getElementById('app')
);

