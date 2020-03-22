import React from "react";

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
        </div>
    );
}
