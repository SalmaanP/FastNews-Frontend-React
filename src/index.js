import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NavBar from './NavBar';
import {ThemeSwitcher} from './react-bootstrap-theme-switcher/index';
import About from './About';
import history from './history';

document.title = "News!";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-77295764-3');
ReactDOM.render(
    <Router basename={'/'} history={history}>
        <ThemeSwitcher storeThemeKey={'dsffffa'} themes={['readable', 'darkly']} themePath="/themes" defaultTheme="readable">

            <NavBar/>

            <Switch>
                {/*<Route exact path={'/'} component={App}/>*/}
                <Route path={'/about'} component={About}/>
                <Route path={'/article/:category/:articleId'} component={App}/>
                <Route path={'/search/:category/:searchString/:pageNo'} component={App}/>
                <Route path={'/:category/:pageNo'} component={App}/>
                <Route path={'/:category'} component={App}/>
                <Redirect from='/' to='/worldnews/0'/>


            </Switch>
        </ThemeSwitcher>
    </Router>, document.getElementById('root'));
registerServiceWorker();
