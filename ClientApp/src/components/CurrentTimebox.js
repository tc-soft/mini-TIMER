﻿import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        console.count("constructor");
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        };
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.intervalId = null;
    }

    componentDidMount() {
        //console.count("componentDidMount");
    }

    componentDidUpdate() {
        console.count("componentDidUpdate");
    }

    componentWillUnmount() {
        console.count("componentWillUnmount");
        this.stopTimer();
    }

    handleStart(event) {
        console.log("handleStart")
        console.log(event)
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }

    handleStop(event) {
        console.log("handleStop")
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }
    startTimer() {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(
                () => {
                    console.log("timer works");
                    this.setState(
                        prevState => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                    );
                },
                100
            );
        }
    }
    stopTimer() {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
    }
    togglePause() {
        this.setState(
            function (prevState) {
                console.count("setState");
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                };
            }
        );
    }
    render() {
        const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

        //if (progressInPercent >= 10) {
        //    this.togglePause(); //wywala po
        //    //this.togglePause; błąd składni
        //    //this.stopTimer();
        //}

        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? "inactive" : ""} />
                <ProgressBar
                    percent={progressInPercent}
                    className={isPaused ? "inactive" : ""}
                    color="red"
                    big
                />
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        );
    }
}

export default CurrentTimebox;