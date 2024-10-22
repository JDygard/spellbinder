import React from "react";

function Fallback(error: Error) {
    return (
        <div role="alert">
            <p>Isaac, what did you do!?</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}

export default Fallback;