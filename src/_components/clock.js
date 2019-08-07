import React,{Component} from 'react';

class Clock extends Component {
  state = {}

  constructor(props) {
    super(props);
    
    this.interval = setInterval(()=>{
      this.setState({now: new Date()})
    },1000)
  }

  static getDerivedStateFromProps(props,state) {
    return {
      now: new Date()
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.clockMode !== this.props.clockMode) {
      return true;
    }  else if (Math.floor(nextState.now/1000) !== Math.floor(this.state.now/1000)) {
      return true;
    }
    return false; 
  }

  render() {
    return <span style={style}>{this.state.now.toLocaleTimeString('en-US',{ hour12: !this.props.clockMode })}</span>;
  }
}

const style = {
  color: '#FFF',
  fontSize: 40,
  fontWeight: 'bold'
};

export {Clock};