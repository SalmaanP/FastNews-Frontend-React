/**
 * Created by Salmaan on 1/2/2018.
 */
import React, {Component} from 'react';
import './About.css';
import Link from "react-router-dom/es/Link";
import ReactGA from 'react-ga';

class About extends Component {


    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {

        return (
            <div className="container">

                <div id="heading">
                    <div style={{textAlign: "center"}}>
                        <h1 style={{fontFamily: "'Courier New'"}}>TL;DR</h1>
                    </div>

                    <hr style={{width: "75%"}}/>

                    <p align="center">
                        This guy <a rel={"noopener"} href={"http://www.salmaan.me"} target={"_blank"}>(Me)</a> created a News Aggregator
                        and Summarizer using Go, React, Python, Redis, AWS. Enjoy!
                    </p>

                </div>

                <br/>

                <div id="heading">
                    <div style={{textAlign: "center"}}>
                        <h1 style={{fontFamily: "'Courier New'"}}>Why make this?</h1>
                    </div>

                    <hr style={{width: "75%"}}/>

                    <p align="justify">
                        The idea behind the app is that there is a truck load of news articles written every day. Some
                        have real
                        information while many are just clickbaity headlines with just fluff in them.
                    </p>
                    <p align="justify">
                        The first problem is what to actually read among these news articles. Instead of spending time
                        finding
                        articles
                        to
                        read, the app presents you curated articles popular on the web with a good amount of discussion
                        already in
                        place
                        about the event.
                    </p>
                    <p align="justify">
                        The second problem is the content. Its not always desirable to read the entire article when
                        there are only a
                        couple of points of importance in the article. Except for long form articles, a couple of points
                        from the
                        article are sufficient to get a gist of the article. The app presents a series of key points
                        from the
                        article
                        generated automatically using summarizing algorithms.
                    </p>
                </div>

                <br/>

                <div id="tech" style={{textAlign: "center"}}>
                    <h1 style={{fontFamily: "'Courier New'"}}>What made this?</h1>
                    <hr style={{width: "75%"}}/>

                    <p align="justify">
                        A Python application on the server instance runs 24x7 as a daemon aggregating popular news
                        articles
                        from the
                        web. It summarizes the articles and adds it to a mongoDB Database on the cloud. The script can
                        be found <a
                        href="https://github.com/SalmaanP/news_backend">here</a>.
                    </p>

                    <p align="justify">
                        The web server runs on Go <sup>
                        <small>(used to be Node.js with PM2, v1.0 you will be missed)</small>
                    </sup>. It
                        responds to API calls with JSON data. Go supposedly gives C++ level performance while being super
                        easy to code in. It is also extremely simple to create multithreaded applications in Go.
                        This part is
                        the backend and is completely decoupled from the application (frontend) that you are "seeing".
                        So in essence
                        it doesn't care where the data is being sent, it could be a website (like now) or a mobile app
                        (added to
                        TODO) or even a microwave (hey, you never know).
                    </p>

                    <p align="justify">
                        The server also has redis. redis is an in-memory database, which is basically database in RAM.
                        We use this
                        as a cache, as the data isn't that volatile. redis has data structures in database, so we create
                        a hashmap
                        and store our data in it using a combination of category and page number as key. We also run a
                        script to
                        flush this hashmap every hour else it will never be updated. The result is instead of 50
                        milliseconds to
                        serve one request, the server takes 5 milliseconds at maximum. (not that the server is that
                        busy, but why
                        not?)
                    </p>

                    <p align="justify">
                        Next is React <sup>
                        <small>(used to be AngularJs)</small>
                    </sup> which is responsible for the single page
                        application. This front-end is built by building separate components which work together. An
                        example would be the NavBar Component, The Article Grid Component which combines several Article
                        Card Components.

                        Notice there are absolutely no redirects on the website. For each category and page
                        number there are separate API calls returning JSON which is displayed on the template. React
                        manages data in the application using state. So we save all data returned from the back-end as
                        the "state" of the component.
                    </p>

                    <p align="justify">
                        The Website is hosted using Amazon Web Services. Shoutout to Free tier and student credits, it
                        really helped. The application runs on an EC2 instance behind a NGINX proxy. Used to be that
                        there was an elastic loadbalancer and elastic auto-scaling enabled which means that a new server
                        instance would be created in times of high traffic and requests distributed evenly, but I can no
                        longer afford that and it was never being triggered anyway due to low traffic.
                    </p>

                </div>

                <br/>

                <div id="salmaan" style={{textAlign: "center"}}>
                    <h1 style={{fontFamily: "'Courier New'"}}>Who made this?</h1>

                    <hr style={{width: "75%"}}/>
                    <p align="justify">
                        Salmaan is a graduate student at San Jose State University studying software engineering
                        (Graduating May 2018).
                    </p>
                    <p align="justify">
                        He plays Dota2 and Overwatch and likes watching movies/tvshows apart from learning more about
                        technology and software.
                    </p>
                    <p align="justify">Find out more about him and his projects at his <a
                        href="http://www.salmaan.me">website</a> or
                        using
                        the following social media buttons
                        <span id="hidden" style={{display: "none", fontSize: "small"}}><del>Psst, he's also looking for internships</del><br/>Hey, he actually did get an awesome internship!<br/>Psst, he will be soon looking for fulltime opportunities</span>
                    </p>


                    <ul className="social-buttons">
                        <li id="demo1">
                            <a href="https://www.twitter.com/Salmaaan" className="brandico-twitter-bird" />
                        </li>
                        <li id="demo2">
                            <a href="https://www.facebook.com/salmaanpehlari" className="brandico-facebook"/>
                        </li>
                        <li id="demo3">
                            <a href="https://www.github.com/salmaanP" className="brandico-github"/>
                        </li>
                        <li id="demo3">
                            <a href="https://www.linkedin.com/in/salmaanP" className="brandico-linkedin"/>
                        </li>
                    </ul>
                </div>

                <br/>

                <div id="changelog">

                    <h1 style={{textAlign: "center", fontFamily: "'Courier New'"}}>Changelog</h1>

                    <hr style={{width: "75%"}}/>

                    <div>
                        <p> v2.0 - Jan 11th, 2018 </p>
                        <div style={{marginLeft: '2%'}}>
                            <p> - Celebrating 1 year of the website (and AWS Fees!) with a complete overhaul of the code
                                base.</p>
                            <p> - Replaced Node.js with Go as the backend web server.</p>
                            <p> - Replaced AngularJs with React as the front-end of the application.</p>
                            <p> - Added SSL</p>
                            <p> - More stuff planned, stay tuned!</p>
                        </div>
                        <p> v1.3 - May 31st, 2017 </p>
                        <div style={{marginLeft: "2%"}}>
                            <p> - SEO stuff.</p>
                            <p> - Created structured data layout according to google's layout. Doesn't seem to be
                                working though.</p>
                            <p> - Made the website scalable. <sup>(yes! for all of you 10 active users <span aria-label="Hug" role={"img"}>🤗</span> )</sup></p>
                            <p> - Moved database to the cloud, added a loadbalancer to the mix and turned on
                                autoscaling.</p>
                            <p> - Added new categories!</p>
                            - New routes are:
                            <Link to="/unitedstates">United States</Link>,
                            <Link to={"/unitedkingdom/0"}>United Kingdom</Link>,
                            <Link to="/canada/0">Canada</Link>,
                            <Link to="/europe/0">Europe</Link>,
                            <Link to="/china/0">China</Link>,
                            <Link to="/upliftingnews/0" >Uplifting News</Link> <sup><span
                            style={{fontSize: "smaller"}}>Could use a lot more of the last one</span></sup>
                            <p/>
                        </div>
                        <p> v1.2 - Jan 10th, 2017 </p>
                        <div style={{marginLeft: "2%"}}>
                            <p> - Added unique pages for each article </p>
                            <p> - Added social media share links</p>
                            <p> - Changed button layout</p>
                            <p/>
                        </div>
                        <p> v1.1 - Jan 5th, 2017 </p>
                        <div style={{marginLeft: "2%"}}>
                            <p> - Added changelog</p>
                            <p> - Can search through multiple pages. </p>
                            <p> - Theme persists on reload. </p>
                            <p> - Added routing. </p>
                            - Current routes are:
                            <Link to="/worldnews/0">/worldnews</Link>,
                            <Link to="/technology/0">/technology</Link>,
                            <Link to="/science/0">/science</Link>,
                            <Link to="/india/0">/india</Link>
                            <p/>
                        </div>
                        <p> v1.0 - Jan 4th, 2017 </p>
                        <div style={{marginLeft: "2%"}}>
                            <p>- Launched! </p>
                        </div>


                        <p>TODO:</p>
                        <div style={{marginLeft: "2%"}}>
                            <p> - Add RSS Feeds </p>
                            <p> - Tweak UI </p>
                            <p> - Analyze data, use clustering algorithms for tagging. </p>
                            <p> - Implement better searching, I am thinking cosine similarity search, need to figure out
                                how to set it up. </p>
                        </div>
                    </div>


                </div>

            </div>

        );
    }
}

export default About;
