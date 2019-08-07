import React,{Component} from 'react';
import { StopWatch,ClockButton } from "../_components";
import { withRouter } from "react-router-dom";

const formattedSeconds = (sec) =>{
    const cSec = sec % 100;
    const counterSec = (sec - cSec) / 100; //Math.floor(states.stopwatch.counter / 1000)
    const hour =  Math.floor(counterSec / 3600);
    const min =   Math.floor((counterSec % 3600) / 60);
    const second =   counterSec % 60;
    return hour.toLocaleString('en',{minimumIntegerDigits: 2}) + ':' + min.toLocaleString('en',{minimumIntegerDigits: 2})+ ':' + second.toLocaleString('en',{minimumIntegerDigits: 2}) + ':' + cSec.toLocaleString('en',{minimumIntegerDigits: 2});
}

class StopWatchPage extends Component {

    state = {
        counter: 0,
        laps: [],
        start: false
    }

    goBack = () => {
        this.props.history.push('/');
    }
    
    startStopWatch = () =>{
        this.setState({start: true})
        this.interval = setInterval(()=>{
            this.setState({counter: this.state.counter + 1})
        },1000)
    }

    addLap = () =>{
        this.setState({
            laps: this.state.laps.concat([this.state.counter])
        })
    }

    pauseStopWatch = () =>{
        this.setState({
            start: false,
        });
        clearInterval(this.interval);
    }

    restart = () =>{
        this.setState({
            counter: 0,
            laps: []
        })
    }

    renderBtn = () =>{
        if (this.state.start) {
            return <>
                <ClockButton onClick = {this.addLap}>Lap</ClockButton>
                <ClockButton onClick={this.pauseStopWatch}>Pause</ClockButton>
            </>
        } else {
            return <>
                <ClockButton onClick = {this.goBack}>Back</ClockButton>
                {this.state.counter ? <ClockButton onClick = {this.restart}>Restart</ClockButton> : null}
                <ClockButton onClick={this.startStopWatch}>Start</ClockButton>
            </>
        }
    }

    render () {
        const {counter} = this.state;
        return <div className="clock-page">
            <StopWatch counter = {counter}/>
            <div style={{marginTop: 20,width: 350,justifyContent: 'space-around'}}>
                {this.renderBtn()}
            </div>
            <ul className="stopwatch-laps">
                { this.state.laps.map((lap, i) =>
                    <li className="stopwatch-lap" id={i} key={i}>
                        <strong>{i + 1}</strong>/ {formattedSeconds(lap)}
                    </li>)
                }
            </ul>
        </div>
    }
}

withRouter(StopWatchPage);

export {StopWatchPage}