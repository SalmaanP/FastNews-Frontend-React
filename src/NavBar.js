/**
 * Created by Salmaan on 12/22/2017.
 */

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import history from './history';
import {ThemeChooser} from './react-bootstrap-theme-switcher/index';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: props.location.pathname === '/' ? 'worldnews' : props.location.pathname.split('/')[1].toLowerCase(),
            moreLabel: 'More',
            moreFlag: false,
            inputValue: '',
            isAbout: props.location.pathname === '/about'
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.search = this.search.bind(this);

    }

    componentDidMount() {
        if (this.props.location.pathname.startsWith('/search') || this.props.location.pathname.startsWith('/article')) {
            this.setState({
                category: this.props.location.pathname.split('/')[2].toLowerCase()
            });
        }
        else if (this.props.location.pathname.startsWith('/about')) {
            this.setState({
                    isAbout: true,
                    category: 'worldnews'
                }
            )
        }
    }


    componentWillReceiveProps(nextProps) {

        console.log(nextProps);

        if (nextProps.location.pathname.startsWith('/search') || nextProps.location.pathname.startsWith('/article')) {

        }

        else if (nextProps.location.pathname.startsWith('/about')) {
            this.setState({
                    isAbout: true,
                    category: 'worldnews'
                }
            )
        }

        else if (nextProps.location.pathname !== '/' && nextProps.location.pathname.startsWith('/')) {

            let path = nextProps.location.pathname.split('/')[1].toLowerCase();

            let moreLabel = 'More';
            let moreFlag = false;

            if (['science', 'technology', 'europe', 'canada', 'china', 'upliftingnews'].includes(path)) {

                console.log('ok');
                if (path === 'upliftingnews') {
                    moreLabel = 'Uplifting News';
                } else {
                    moreLabel = path;
                }
                moreFlag = true;
            }

            this.setState({
                category: path,
                moreLabel,
                moreFlag,
                isAbout: false
            });
        } else {
            this.setState({
                category: 'worldnews',
                moreLabel: 'More',
                moreFlag: false,
                isAbout: false
            });
        }


    }

    search() {
        history.push('/search/' + this.state.category + '/' + this.state.inputValue + '/0');
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        })
    }

    render() {

        return (

            <nav style={{padding: '0'}} className="navbar navbar-expand-lg navbar-inverse bg-inverse">
                <NavLink className={"navbar-brand"} to={'/'}>News!</NavLink>
                {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"*/}
                        {/*aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">*/}
                    {/*<span className="navbar-toggler-icon"/>*/}
                {/*</button>*/}
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span><span className="icon-bar" /><span className="icon-bar" /><span className="icon-bar" /></button>


                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className={this.state.category === 'worldnews' ? 'active nav-item' : 'nav-item'}>
                            <NavLink exact={true} activeClassName={"active"} className="nav-item nav-link"
                                     to={{pathname: '/worldnews/0'}}>World</NavLink>
                        </li>
                        <li className={this.state.category === 'unitedstates' ? 'active nav-item' : 'nav-item'}>
                            <NavLink activeClassName={"active"} className="nav-link"
                                     to={{pathname: '/unitedstates/0'}}>United
                                States</NavLink>
                        </li>
                        <li className={this.state.category === 'india' ? 'active nav-item' : 'nav-item'}>
                            <NavLink activeClassName={"active"} className="nav-link"
                                     to={{pathname: '/india/0'}}>India</NavLink>
                        </li>
                        <li className={this.state.category === 'unitedkingdom' ? 'active nav-item' : 'nav-item'}>
                            <NavLink className="nav-link" to={{pathname: '/unitedkingdom/0'}}>United Kingdom</NavLink>
                        </li>
                        <li style={{"marginRight": "40px"}} className={this.state.moreFlag ? "nav-item dropdown active" : "nav-item dropdown"}>
                            <a className="nav-link dropdown-toggle" style={{textTransform: "capitalize"}}
                               data-toggle="dropdown" href="#" id="download"
                               aria-expanded="false">{this.state.moreLabel}</a>
                            <ul className="dropdown-menu" aria-labelledby="download">
                                <li><NavLink to={{pathname: '/science/0'}}>Science</NavLink></li>
                                <li><NavLink to={{pathname: '/technology/0'}}>Technology</NavLink></li>
                                <li><NavLink to={{pathname: '/europe/0'}}>Europe</NavLink></li>
                                <li><NavLink to={{pathname: '/canada/0'}}>Canada</NavLink></li>
                                <li><NavLink to={{pathname: '/china/0'}}>China</NavLink></li>
                                <li><NavLink to={{pathname: '/upliftingnews/0'}}>Uplifting
                                    News</NavLink></li>
                            </ul>
                        </li>




                        <form style={{}}
                            onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.search();
                                }
                            } className="form-inline my-2 my-lg-0">
                            <input style={{background: "rgba(68,68,68,.1)",borderRadius:"3px", border: "1px solid #fff"}} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}
                                   className="form-control mr-sm-2" placeholder="Search" type="text"/>
                        </form>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className={this.state.isAbout ? 'active nav-item' : 'nav-item'}>
                            <NavLink className="nav-link" to={{pathname: '/about'}}>About</NavLink>
                        </li>
                        <ThemeChooser className={"nav-link"}/>
                    </ul>

                </div>
            </nav>
        )
    }


}

export default withRouter(NavBar);