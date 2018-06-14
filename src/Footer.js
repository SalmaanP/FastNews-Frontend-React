import React, {Component} from 'react';
import './Footer.css'

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let borderColor;
        if(localStorage.getItem('dsffffa') === '"readable"'){
            borderColor = '#333';
        } else {
            borderColor = '#fff';
        }

        return (
            <footer>
                <div style={{borderColor:borderColor}} className={"FooterGrid"}>
                    <div className={"FooterSource"}>
                        <a target={"_blank"} href={"https://github.com/SalmaanP/FastNews-Frontend-React"}>Source</a>
                    </div>
                    <div className={"FooterFeedback"}>
                        <a href="mailto:feedback@fastnews.me">Feedback</a>
                    </div>
                    <div className={"FooterWinApp"}>
                        <a target={"_blank"} href="https://www.microsoft.com/en-us/p/fastnews/9ng19lf3tkwp">Windows App</a>
                    </div>
                    <div className={"FooterAmzApp"}>
                        <a target={"_blank"} href="https://www.amazon.com/Salmaan-Pehlari-Fast-News/dp/B079YNQNQJ/">Alexa Skill</a>
                    </div>
                    <div style={{cursor: 'pointer'}} className={"FooterTop"}>
                        <a onClick={() => {window.scroll(0,0)}}>Back To Top</a>
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;




