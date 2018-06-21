class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.running = false;
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
          };
      }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
  
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() {
        if (!this.running) return;
        this.calculate();
	}

	calculate() {
        this.setState(prevState => {
            prevState.times.miliseconds += 1;
            if (prevState.times.miliseconds >= 100) {
                prevState.times.seconds += 1;
                prevState.times.miliseconds = 0;
            }
            if (prevState.times.seconds >= 60) {
                prevState.times.minutes += 1;
                prevState.times.seconds = 0;
            }

            return prevState;
        });
	}

	stop() {
    	this.running = false;
    	clearInterval(this.watch);
	}
 
    resetTime() {
    this.running = false;
    this.reset();
  }
  
   render() {
     const newTime = this.format(this.state.times);
     return (
        <div className='box'>
            <div className='watch'>
                <div className='controls'>
                  <a href='#' className='button' onClick={this.start.bind(this)} >Start</a>
                  <a href='#' className='button' onClick={this.stop.bind(this)} >Stop</a>
                  <a href='#' className='button' onClick={this.resetTime.bind(this)} >Reset</a>
                </div>
                <div className='stopwatch'>
                   {newTime}
                </div>
            </div>
         </div>
      );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);