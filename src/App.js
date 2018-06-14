import React, {Component} from 'react';
import './App.css';
import {
    Card,
    CardText,
    CardTitle,
    CardSubtitle,
    Button,
    CardHeader,
    CardBody
} from 'reactstrap';
import axios from 'axios';
import history from './history';
import moment from 'moment';
import Spinner from 'react-spinkit';
import ReactGA from 'react-ga';

let mode = 'production';
let host = '';
if (mode === 'production') {
    host ='https://fastnews.me'
} else {
    host = 'http://localhost:12345';
}


function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}

class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            category: this.props.match.params.category,
            pageNo: this.props.match.params.pageNo,
            view: this.props.match.params.articleId ? 'article' : 'grid',
            article: {},
            scrollX: 0,
            scrollY: 0,
            isSearch: !!this.props.match.params.searchString,
            searchString: this.props.match.params.searchString,
            isLoading: false
        };

        this.requestArticles = this.requestArticles.bind(this);
        this.requestArticle = this.requestArticle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

    }

    componentDidMount() {

        let requestCategory;

        let articleCardStyle = {};
        let theme = '';

        if(localStorage.getItem('dsffffa') === '"readable"'){
            articleCardStyle = {backgroundColor: '#fff', borderColor: '#333', height: "inherit", flex: "1 1 auto", padding: "1.25rem", boxSizing: "border-box"};
            theme = 'light';
        } else {
            articleCardStyle = {backgroundColor: '#333', borderColor: '#fff', height: "inherit", flex: "1 1 auto", padding: "1.25rem", boxSizing: "border-box"};
            theme = 'dark';
        }

        this.setState({
            articleCardStyle,
            theme
        });


        this.props.match.params.category ? requestCategory = this.props.match.params.category : requestCategory = 'worldnews';


        if (requestCategory === 'unitedstates') {
            requestCategory = 'news';
        }

        if (this.state.isSearch) {
            this.searchArticles(requestCategory, this.props.match.params.pageNo || 0, this.props.match.params.searchString);

        } else if (this.state.view === 'grid') {
            this.requestArticles(requestCategory, this.props.match.params.pageNo || 0);
        } else if (this.state.view === 'article') {
            this.requestArticle(requestCategory, this.props.match.params.articleId);
        }

    }

    componentWillReceiveProps(nextProps) {

        // console.log(nextProps);

        if (nextProps.match.params.searchString) {
            this.searchArticles(nextProps.match.params.category, nextProps.match.params.pageNo || 0, nextProps.match.params.searchString)
        }

        else if (!nextProps.match.params.articleId &&
            (nextProps.match.params.category !== this.state.category
                || this.state.articles.length < 1
                || this.state.isSearch
                || this.state.pageNo !== (nextProps.match.params.pageNo || 0)
            )) {
            let requestCategory;

            nextProps.match.params.category ? requestCategory = nextProps.match.params.category : requestCategory = 'worldnews';

            if (requestCategory === 'unitedstates') {
                requestCategory = 'news';
            }

            this.requestArticles(requestCategory, nextProps.match.params.pageNo || 0);
        }

        else if (nextProps.match.params.category === this.state.category && this.state.view === 'article' && this.state.articles.length > 0) {
            this.changeView();
        }

    }

    requestArticles(category, pageNo) {

        this.setState({
            isLoading: true
        }, () => {
            axios.get(host + '/api/getData/' + category + '/' + pageNo)
                .then(res => {
                    this.setState({
                        articles: res.data,
                        category: category === 'news' ? 'unitedstates' : category,
                        pageNo,
                        view: 'grid',
                        isSearch: false,
                        isLoading: false
                    }, () => {
                        document.title = "News From " + capitalize(this.state.category);
                        ReactGA.pageview(window.location.pathname + window.location.search);

                    });
                })
        });


    }

    requestArticle(category, articleId) {

        this.setState({
            isLoading: true
        }, () => {
            axios.get(host + '/api/getArticle/' + category + '/' + articleId)
                .then(res => {
                    this.setState({
                        article: res.data,
                        category: category === 'news' ? 'unitedstates' : category,
                        view: 'article',
                        isSearch: false,
                        isLoading: false
                    });
                    document.title = res.data.Title;
                    ReactGA.pageview(window.location.pathname + window.location.search);

                })
        });

    }

    searchArticles(category, pageNo, searchString) {

        this.setState({
            isLoading: true
        }, () => {
            axios.get(host + '/api/search/' + searchString + '/' + category + '/' + pageNo)
                .then(res => {
                    this.setState({
                        articles: res.data,
                        category: category === 'news' ? 'unitedstates' : category,
                        pageNo,
                        view: 'grid',
                        isSearch: true,
                        searchString,
                        isLoading: false
                    }, () => {
                        document.title = "Search " + capitalize(this.state.category) + " : " + this.state.searchString;
                        ReactGA.pageview(window.location.pathname + window.location.search);

                    });


                })
        });
    }

    changeView(article) {

        if (this.state.view === 'article' && this.state.articles.length < 1) {
            history.push('/' + this.state.category);
            this.requestArticles(this.state.category, this.props.match.params.pageNo || 0);
            document.title = "News From " + capitalize(this.state.category);
        }

        else if (this.state.isSearch && this.state.view === 'article') {
            history.push('/search/' + this.state.category + '/' + this.state.searchString + '/' + this.state.pageNo || 0);
            this.setState({
                view: 'grid',
                article: {}
            }, () => {
                window.scroll(this.state.scrollX, this.state.scrollY);
                document.title = "Search " + capitalize(this.state.category) + " : " + this.state.searchString
            })
        }

        else if (!this.state.isSearch && this.state.view === 'article') {
            history.push('/' + this.state.category + '/' + this.state.pageNo);
            this.setState({
                view: 'grid',
                article: {}
            }, () => {
                window.scroll(this.state.scrollX, this.state.scrollY);
                document.title = "News From " + capitalize(this.state.category);
            })
        }
        else if (this.state.view === 'grid') {
            history.push('/article/' + this.state.category + '/' + article.Id);
            this.setState({
                view: 'article',
                article,
                scrollY: window.pageYOffset || document.documentElement.scrollTop,
                scrollX: window.pageXOffset || document.documentElement.scrollLeft
            }, () => {
                window.scroll(0, 0);
                document.title = article.Title;
            })
        }
    }

    increment() {
        if (this.state.isSearch) {
            history.push('/search/' + this.state.category + '/' + this.state.searchString + '/' + String(parseInt(this.state.pageNo, 10) + 1));
        } else {
            history.push('/' + this.state.category + '/' + String(parseInt(this.state.pageNo, 10) + 1));
        }
    }

    decrement() {

        if (this.state.isSearch) {
            history.push('/search/' + this.state.category + '/' + this.state.searchString + '/' + String(parseInt(this.state.pageNo, 10) - 1));
        } else {
            history.push('/' + this.state.category + '/' + String(parseInt(this.state.pageNo, 10) - 1));
        }
    }

    render() {

        const PaginationButton = (props) => {
            if (this.state.articles && props.type === 'increment' && this.state.articles.length > 0) {
                return (
                    <button onClick={this.increment} className={this.state.theme === 'light' ? "buttonPaginationLight nextFancyLight" : "buttonPaginationDark nextFancyDark"}>&rsaquo;</button>
                )
            } else if (props.type === 'decrement' && this.state.pageNo > 0) {
                return (
                    <button onClick={this.decrement} className={this.state.theme === 'dark' ? "buttonPaginationDark previousFancyDark" : "buttonPaginationLight previousFancyLight"}>&lsaquo;</button>
            )
            } else {
                return (
                    <div/>
                )
            }
        };

        const Pagination = () => {
            return (
                <div className={"paginationGrid"}>
                    <div className={"paginationLeft"}>
                        <PaginationButton type={"decrement"}/>
                    </div>
                    <div className={"paginationRight"}>
                        <PaginationButton type={"increment"}/>
                    </div>
                </div>
            )
        };

        const ArticleCard = (props) => {

            const data = {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "isFamilyFriendly": "true",
                "inLanguage": "en",
                "description": props.articleDetails.Summary,
                "name": props.articleDetails.Title,
                "headline": props.articleDetails.Title,
                "datePublished": props.articleDetails.Date,
                "dateModified": props.articleDetails.Date,
                "articleBody": props.articleDetails.KeyPoints.join('\n'),
                "image": {
                    "@type": "imageObject",
                    "url": "https://www.fastnews.me/logo.png",
                    "height": "800",
                    "width": "800"
                },
                "author": props.articleDetails.Domain,
                "url": props.articleDetails.Url,
                "publisher": {
                    "@type": "Organization",
                    "name": props.articleDetails.Domain,
                    "logo": {
                        "@type": "imageObject",
                        "url": props.articleDetails.Url
                    }
                }
            };

            return (

                <Card className={"articleCard effect2"}
                      style={this.state.articleCardStyle}>

                    <CardHeader style={{overflow: 'hidden', textOverflow: 'ellipsis'}} className="articleHeader">
                        <CardTitle className={"h4"} style={{marginTop: '0'}}>
                            <a itemProp="url" rel={"noopener"} target={"_blank"} style={{textDecoration: "none", color: "inherit"}}
                               href={props.articleDetails.Url}>
                                {props.articleDetails.Title}
                            </a>
                        </CardTitle>
                    </CardHeader>
                    <CardBody className="articleBody">
                        <CardText style={{textAlign: "justify"}}>{props.articleDetails.Summary}</CardText>
                    </CardBody>
                    <div className="articleFooter">
                        {/*<Link to={'/article/' + this.state.category + '/' + props.articleDetails.Id}>*/}
                        <Button onClick={this.changeView.bind(this, props.articleDetails)}
                                className={"articleKeypoints"} outline color="success">Read
                            Keypoints</Button>
                        {/*</Link>*/}
                        <CardSubtitle className={"articleDomain"} style={{verticalAlign: 'text-bottom'}}>
                            <small >{props.articleDetails.Domain}</small>
                        </CardSubtitle>
                        <link href="https://www.fastnews.me/logo.png" />
                    </div>
                    <script type="application/ld+json">
                        {JSON.stringify(data)}
                    </script>
                </Card>

            )

        };

        const GridLayout = (props) => {
            if (props.articles) {


                let layout = [];
                let total_articles = props.articles ? props.articles.length : 0;
                let nRows = total_articles / 3;
                let nCols = 3;

                for (let i = 0; i < nRows; i++) {
                    for (let j = 0; j < nCols && (i * nCols) + j < total_articles; j++) {
                        layout.push(
                            <div key={(i * nCols) + j} className="card-columns" itemScope itemType="http://schema.org/NewsArticle">
                                <ArticleCard articleDetails={props.articles[(i * nCols) + j]}/>
                            </div>)
                    }
                }
                return (
                    <div id="mainContent" style={{paddingLeft: "6%", paddingRight: "6%"}} className="layoutGrid">
                        {props.articles.map((article, index) => (
                            <div key={index}>
                                <ArticleCard articleDetails={article}/>
                            </div>
                        ))}
                    </div>
                )
            } else {
                return (
                    <div id="mainContent" style={{paddingLeft: "6%", paddingRight: "6%"}} className="layoutGrid">
                        <div>
                            <h1>No Articles Found</h1>
                        </div>
                    </div>
                )
            }
        };

        const GridView = () => {
            return (
                <div>
                    <GridLayout articles={this.state.articles}/>
                </div>
            )
        };

        const ArticleView = (props) => {
            if (!props.article.KeyPoints) {
                return null;
            } else {


                return (
                    <div>
                        <div style={{display: "grid", justifyContent: "right"}}>
                            <span onClick={this.changeView} className={"close hairline"}/>
                        </div>
                        <div className={"specificGrid"}  itemScope itemType="http://schema.org/NewsArticle">
                            <meta itemProp="inLanguage" content="en" />
                            <meta itemProp="isFamilyFriendly" content="true" />
                            <meta itemProp={"description"} content={props.article.Summary} />
                            <div className={"specificHeader"} itemProp="name headline mainEntityOfPage">
                                <h1>
                                    <a rel={"noopener"} target={"_blank"} style={{textDecoration: "none", color: "inherit"}}
                                       href={props.article.Url}>{props.article.Title}</a>
                                </h1>
                            </div>
                            <div className={"specificInfo"}>
                                <div className={"specificDate"}>
                                    <h6 itemProp={"datePublished dateModified"} >{moment(props.article.Date).format("MMM DD Y (dddd)")}</h6>
                                </div>
                                <div className={"specificDomain"} itemProp={"author"}>
                                    <h6>{props.article.Domain}</h6>
                                </div>
                            </div>
                            <div itemProp={"articleBody"} className={"specificBody"}>
                                <ul>
                                    {props.article.KeyPoints.map((point, index) => <li key={index}><p
                                        style={{fontSize: "20px"}}>{point}</p></li>)}
                                </ul>
                            </div>
                            <div className={"specificFooter"}>
                                <div className={"specificComments"}>
                                    <a rel={"noopener"} target={"_blank"}
                                       href={props.article.Permalink}>View {props.article.Comments} Reddit
                                        Comments</a>
                                </div>
                                <div className={"specificShare"}>

                                    <a className="resp-sharing-button__link"
                                       href={"https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Ffastnews.me/article/" + this.state.category + '/' + props.article.Id}
                                       target="_blank" aria-label="" rel={"noopener"}>
                                        <div
                                            className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
                                            <div aria-hidden="true"
                                                 className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M18.77 7.5H14.5V5.6c0-.9.6-1.1 1-1.1h3V.54L14.17.53C10.24.54 9.5 3.48 9.5 5.37V7.5h-3v4h3v12h5v-12h3.85l.42-4z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                    <a className="resp-sharing-button__link"
                                       href={"https://twitter.com/intent/tweet/?text=" + props.article.Title + "&amp;url=http%3A%2F%2Ffastnews.me/article/" + this.state.category + '/' + props.article.Id}
                                       target="_blank" aria-label="" rel={"noopener"}>
                                        <div
                                            className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
                                            <div aria-hidden="true"
                                                 className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                    <a className="resp-sharing-button__link"
                                       href={"https://plus.google.com/share?url=http%3A%2F%2Ffastnews.me/article/" + this.state.category + '/' + props.article.Id}
                                       target="_blank" aria-label="" rel={"noopener"}>
                                        <div
                                            className="resp-sharing-button resp-sharing-button--google resp-sharing-button--small">
                                            <div aria-hidden="true"
                                                 className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M11.37 12.93c-.73-.52-1.4-1.27-1.4-1.5 0-.43.03-.63.98-1.37 1.23-.97 1.9-2.23 1.9-3.57 0-1.22-.36-2.3-1-3.05h.5c.1 0 .2-.04.28-.1l1.36-.98c.16-.12.23-.34.17-.54-.07-.2-.25-.33-.46-.33H7.6c-.66 0-1.34.12-2 .35-2.23.76-3.78 2.66-3.78 4.6 0 2.76 2.13 4.85 5 4.9-.07.23-.1.45-.1.66 0 .43.1.83.33 1.22h-.08c-2.72 0-5.17 1.34-6.1 3.32-.25.52-.37 1.04-.37 1.56 0 .5.13.98.38 1.44.6 1.04 1.85 1.86 3.55 2.28.87.23 1.82.34 2.8.34.88 0 1.7-.1 2.5-.34 2.4-.7 3.97-2.48 3.97-4.54 0-1.97-.63-3.15-2.33-4.35zm-7.7 4.5c0-1.42 1.8-2.68 3.9-2.68h.05c.45 0 .9.07 1.3.2l.42.28c.96.66 1.6 1.1 1.77 1.8.05.16.07.33.07.5 0 1.8-1.33 2.7-3.96 2.7-1.98 0-3.54-1.23-3.54-2.8zM5.54 3.9c.32-.38.75-.58 1.23-.58h.05c1.35.05 2.64 1.55 2.88 3.35.14 1.02-.08 1.97-.6 2.55-.32.37-.74.56-1.23.56h-.03c-1.32-.04-2.63-1.6-2.87-3.4-.13-1 .08-1.92.58-2.5zM23.5 9.5h-3v-3h-2v3h-3v2h3v3h2v-3h3z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                    <a className="resp-sharing-button__link"
                                       href={"mailto:?subject=" + props.article.Title + "&body=http%3A%2F%2Ffastnews.me/article/" + this.state.category + '/' + props.article.Id + '%0A%0A%0A' + props.article.KeyPoints.join('%0A%0A')}
                                       target="_self" aria-label="">
                                        <div
                                            className="resp-sharing-button resp-sharing-button--email resp-sharing-button--small">
                                            <div aria-hidden="true"
                                                 className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path
                                                        d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                    <a className="resp-sharing-button__link"
                                       href={"https://reddit.com/submit/?url=http%3A%2F%2Ffastnews.me/article/" + this.state.category + '/' + props.article.Id + '&title=' + props.article.Title}
                                       target="_blank" aria-label="" rel={"noopener"}>
                                        <div
                                            className="resp-sharing-button resp-sharing-button--reddit resp-sharing-button--small">
                                            <div aria-hidden="true"
                                                 className="resp-sharing-button__icon resp-sharing-button__icon--normal">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <ellipse cx="12" cy="15" rx="9.5" ry="6.5"/>
                                                    <path
                                                        d="M15.54 17.88c-.96.55-2.2.88-3.54.88-1.35 0-2.6-.33-3.55-.9"/>
                                                    <circle cx="16" cy="13.5" r="1.5"/>
                                                    <circle cx="8" cy="13.5" r="1.5"/>
                                                    <path
                                                        d="M18.74 10.42C19.14 9.58 20 9 21 9c1.38 0 2.5 1.12 2.5 2.5 0 1.25-.92 2.3-2.12 2.47"/>
                                                    <circle cx="20" cy="4.5" r="2.5"/>
                                                    <path
                                                        d="M5.26 10.42C4.86 9.58 4 9 3 9 1.62 9 .5 10.12.5 11.5c0 1.25.92 2.3 2.12 2.47M12 8.5s-.13-7.4 5.5-4"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </a>


                                </div>
                                <div className={"specificScore"}>
                                    Popularity: {props.article.Score}
                                </div>
                            </div>
                            <link itemProp="image" href="https://www.fastnews.me/logo.png" />

                            <span itemType="https://schema.org/Organization" itemScope="itemScope" itemProp="publisher">
                                <link itemProp="url" href={props.article.Domain} />
                                    <meta itemProp="name" content={props.article.Domain} />
                                    <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                                        <meta itemProp="url" content={props.article.Url} /><meta itemProp="width" content="600" /><meta itemProp="height" content="60" />
                                    </span>
                            </span>





                        </div>
                    </div>
                )
            }
        };

        if(this.state.isLoading){

            let classes = ["circle",
                "cub-grid",
                "wave",
                "folding-cube",
                "three-bounce",
                "double-bounce",
                "wandering-cubes",
                "chasing-dots",
                "ball-grid-pulse",
                "ball-pulse-rise",
                "line-scale",
                "line-scale-pulse-out",
                "line-scale-pulse-out-rapid",
                "line-scale-party",
                "ball-pulse-sync", "ball-beat"];

            return (
                    <div style={{textAlign: "center", justifySelf: "center"}}>
                        <Spinner style={{margin: "auto", textAlign: "center", justifySelf: "center"}} name={classes[Math.floor(Math.random()*classes.length)]} color={'#bf209f'} fadeIn='none' />
                    </div>

            )
        }
        else if (!this.state.isLoading && this.state.view === 'grid') {
            return (
                <div>
                    <Pagination style={{paddingBottom: '1.25em'}}/>
                    <GridView/>
                    <Pagination/>
                </div>
            );
        } else if (!this.state.isLoading && this.state.view === 'article') {
            return (
                <ArticleView article={this.state.article}/>
            );
        }
    }
}

export default App;
