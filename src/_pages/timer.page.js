import React,{Component} from 'react';
import { Timer,ClockButton } from "../_components";
import { withRouter } from "react-router-dom";

class TimerPage extends Component {
    
    
        state = {
            counter: 0, 
            start: false,
            hours:'',
            mins:'',
            secs:''
        }
      

    handleChange = (event) => {
        const {target:{value,name}} = event;
        this.setState({ [name] : value });
        
    }

    goBack = () => {
        this.props.history.push('/');
    }
    
    startTimer = () =>{
        debugger
        this.setState({start: true,counter:!this.state.counter ? this.state.hours*3600 + this.state.mins*60 + +this.state.secs : this.state.counter})
        this.interval = setInterval(()=>{
            if(this.state.counter > 0) this.setState({counter: this.state.counter - 1})
        },1000)
    }

    pauseTimer = () =>{
        this.setState({
            start: false,
        });
        clearInterval(this.interval);
    }

    restart = () =>{
        this.setState({
            counter: 0,
            start: false
        })
    }

    renderBtn = () =>{
        if (this.state.start) {
            return <>
                <ClockButton onClick={this.pauseTimer}>Pause</ClockButton>
                {this.state.counter ? <ClockButton onClick = {this.restart}>Reset</ClockButton> : null}
            </>
        } else {
            return <>
                <ClockButton onClick = {this.goBack}>Back</ClockButton>
                <ClockButton onClick={this.startTimer}>Start</ClockButton>
            </>
        }
    }

    render () {
        const {counter} = this.state;
        return <div className="clock-page">
                <div style={{flexDirection:'column', alignItems: 'center'}} className="timer-page">
                    <h1>Input your desired time</h1>
                    <div>
                        <input type="text" onChange={this.handleChange} value={this.state.hours} required name="hours"/> :
                        <input type="text" onChange={this.handleChange} value={this.state.mins} required name="mins"/> :
                        <input type="text" onChange={this.handleChange} value={this.state.secs} required name="secs"/>
                    </div>
                    <Timer counter = {counter}/>
                    <div style={{marginTop: 20,width: 350,justifyContent: 'space-around'}}>
                        {this.renderBtn()}
                    </div>
                </div>
        </div>
    }
}

withRouter(TimerPage);

export {TimerPage}