import React,{Component} from 'react';
import { StopWatch,ClockButton } from "../_components";
import { withRouter } from "react-router-dom";



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
        },10)
    }

    addLap = () =>{
        this.setState({
            laps: this.state.laps.concat([this.state.counter])
        })
    }

    clockStyle = (milsec) =>{
        const cSec = milsec % 100;
        const counterSec = (milsec - cSec) / 100; 
        const hour = Math.floor(counterSec / 3600);
        const min = Math.floor((counterSec % 3600) / 60);
        const sec = counterSec % 60;
        return hour.toLocaleString('en',{minimumIntegerDigits: 2}) + ':' 
        + min.toLocaleString('en',{minimumIntegerDigits: 2})+ ':' 
        + sec.toLocaleString('en',{minimumIntegerDigits: 2})+ ':' 
        + cSec.toLocaleString('en',{minimumIntegerDigits: 2})
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
                <div style={{flexDirection:'column', alignItems: 'center'}}> 
                    <StopWatch counter = {counter}/>
                    <div style={{marginTop: 20,width: 350,justifyContent: 'space-around'}}>
                        {this.renderBtn()}
                    </div>
                </div>
                <div>
                    <ul className="stopwatch-laps">
                        { this.state.laps.map((lap, i) =>
                            <li className="stopwatch-lap" id={i} key={i}>
                                <strong>{i + 1}</strong>/ {this.clockStyle(lap)}
                            </li>)
                        }
                    </ul>
                </div>
        </div>
    }
}

withRouter(StopWatchPage);

export {StopWatchPage}