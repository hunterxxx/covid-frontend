import { useEffect } from "react";
import ReactGA from "react-ga";
import { withRouter } from "react-router";

function sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
}

function GAListener({ children, trackingId, history }) {
    useEffect(() => {
        ReactGA.initialize(trackingId);
        sendPageView(history.location);
        return history.listen(sendPageView);
    }, [history, trackingId]);

    return children;
}

export default withRouter(GAListener);