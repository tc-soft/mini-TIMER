import React from "react";

function Clocik({ className = "", minutes = 20, seconds = 48 }) {
    return <h2 className={"Clocik " + className}>Pozostało {minutes}:{seconds}</h2>
}

export default Clocik;
