import React from "react";
import './Updates.css';

export default function Template() {

    return (
        <div className="container mt-2">
            <h3>Project was contributed by: </h3>
            <ul>
                <li><a href="https://github.com/hunterxxx">Hunter</a></li>
                <li><a href="https://github.com/christianheyn">Heyn Christian</a></li>
            </ul>
            <p>Thank you so much!</p>
            <p>As it's an open source project , feel free to submit pull requests for feature updates or bug fixes!</p>
            <p><b>Repository:  <a href="https://github.com/hunterxxx/covid-frontend">Github</a></b></p>
            <hr />
            <h3>Features Updates:</h3>
            <ul>
                <li>Added Bookmark</li>
                <li>Added Parameter result: https://www.hunterisgod.com/?city=berlin</li>
            </ul>
            <h3>Roadmaps</h3>
            <ul>
                <li>AI Q&A</li>
                <li>Push Notifications</li>
                <li>Internationalization i18n (DE/EN)</li>
                <li>News (DE news Auto translate to EN)</li>
                <li>Chat / Comments</li>
                <li>Progressive Web App (PWA) cached on local storage</li>
            </ul>
        </div>
    );
}
