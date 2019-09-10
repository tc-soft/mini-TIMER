import React from "react";

function Clock({ className = "", minutes = 20, seconds = 48 }) {
    return <h2 className={"Clock " + className}>Pozostało {minutes}:{seconds}</h2>
}

export default Clock;
