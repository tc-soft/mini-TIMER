import React from "react";
import PropTypes from "prop-types";

function Clock({ className, minutes, seconds }) {
    return <h2 className={"Clock " + className}>Pozostało {minutes}:{seconds}</h2>
}

Clock.defaultProps = {
    className: "",
}

const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

Clock.propTypes = {
    className: PropTypes.string,
    minutes: NumberOrStringType.isRequired,
    seconds: NumberOrStringType.isRequired
}

export default Clock;
