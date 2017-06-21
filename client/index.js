import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import AppStore from './store/AppStore';
import loadDocuments from './actions/DocumentsAction';
import './styles/styles.scss';

injectTapEventPlugin();

const store = AppStore();
store.dispatch(loadDocuments());
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>, document.getElementById('app')
);

