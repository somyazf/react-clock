import React,{Component} from 'react';
import { Timer,ClockButton } from "../_components";
import { withRouter } from "react-router-dom";

class TimerPage extends Component {
    
    
        state = {
            counter: 0, 
            values: [1,20,12],
            start: false
        }
        // this.handleChange = this.handleChange.bind(this);
      

    handleChange() {
        // const inputValues = [this.state.values];
        // inputValues[i] = event.target.value;
         console.log(this.state.values[0] + this.state.values[1])
        // this.setState({
        //   counter: (this.state.values[0]*3600) + (this.state.values[1]*60) + (this.state.values[2])
        // })
    }

    goBack = () => {
        this.props.history.push('/');
    }
    
    startTimer = () =>{
        this.setState({start: true})
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
                <div style={{flexDirection:'column', alignItems: 'center'}}>
                    <Timer counter = {counter} handleChange = {this.handleChange}/>
                    <div style={{marginTop: 20,width: 350,justifyContent: 'space-around'}}>
                        {this.renderBtn()}
                    </div>
                </div>
        </div>
    }
}

withRouter(TimerPage);

export {TimerPage}