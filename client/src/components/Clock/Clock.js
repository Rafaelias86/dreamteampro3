<<<<<<< HEAD
import React from 'react';
import moment from 'moment';
import "./Clock.css";
=======
import "./Clock.css";
import React from "react";
import moment from "moment";

>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      day: moment().format("dddd").toString(),
      month: moment().format("MMMM").slice(0, 3),  
      date: moment().format("DD").toString(), 
      year: moment().format("YYYY").toString(),      
      hour: moment().format("HH").toString(),
      minute: moment().format("mm").toString(),
      second: moment().format("ss").toString(),
      ampm: moment().format("A").toString(),
=======
      day: moment()
        .format("dddd")
        .toString(),
      month: moment()
        .format("MMMM")
        .slice(0, 3),
      date: moment()
        .format("DD")
        .toString(),
      year: moment()
        .format("YYYY")
        .toString(),
      hour: moment()
        .format("HH")
        .toString(),
      minute: moment()
        .format("mm")
        .toString(),
      second: moment()
        .format("ss")
        .toString(),
      ampm: moment()
        .format("A")
        .toString()
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
=======
    this.timerID = setInterval(() => this.tick(), 1000);
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
<<<<<<< HEAD
    this.setState({   
      day: moment().format("dddd").toString(),
      month: moment().format("MMMM").slice(0, 3),
      date: moment().format("DD").toString(),        
      year: moment().format("YYYY").toString(),
      hour: moment().format("hh").toString(),
      minute: moment().format("mm").toString(),
      second: moment().format("ss").toString(),
      ampm: moment().format("a").toString(),
    });
  }
=======
    this.setState({
      day: moment()
        .format("dddd")
        .toString(),
      month: moment()
        .format("MMMM")
        .slice(0, 3),
      date: moment()
        .format("DD")
        .toString(),
      year: moment()
        .format("YYYY")
        .toString(),
      hour: moment()
        .format("hh")
        .toString(),
      minute: moment()
        .format("mm")
        .toString(),
      second: moment()
        .format("ss")
        .toString(),
      ampm: moment()
        .format("a")
        .toString()
    });
  };
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117

  render() {
    const { day, month, date, year, hour, minute, second, ampm } = this.state;
    return (
      <div className="display">
<<<<<<< HEAD

        <div className="date"> 
          <span>{day}</span>        
=======
        <div className="date">
          <span>{day}</span>
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
          <span>{month}</span>
          <span>{date}</span>
          <span>{year}</span>
        </div>

<<<<<<< HEAD
      
        <div className="clock">        
=======
        <div className="clock">
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
          <span className="clock-element-main">{hour}</span>
          <span className="clock-element-colon">:</span>
          <span className="clock-element-main">{minute}</span>
          <span className="clock-element-colon">:</span>
          <span className="clock-element-main">{second}</span>
          <span className="clock-element-ampm">{ampm}</span>
        </div>
        {/*<div className="clock-labels">
          <span className="clock-element-main">hr</span>
          <span className="clock-element-main">min</span>
          <span className="clock-element-main">sec</span>
    </div>*/}
<<<<<<< HEAD
      
      </div>

=======
      </div>
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
    );
  }
}

<<<<<<< HEAD
export default Clock;
=======
export default Clock;
>>>>>>> 888c7607fdf22df67e443de7d817bfc94e069117
