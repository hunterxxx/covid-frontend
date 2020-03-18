import React, { useState, useEffect } from "react";

function Landing() {
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState({});

    async function fetchData() {
        const res = await fetch("https://backend-sql.herokuapp.com/covids");
        res
            .json()
            .then(res => setData(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            <span>{JSON.stringify(data)}</span>
            <hr />
            <span>Has error: {JSON.stringify(hasError)}</span>
        </div>
    );
};
export default Landing;
