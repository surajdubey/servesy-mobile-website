
import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import config from '../../config';
import sendEmail from '../sendEmail';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', mobileNumber: '', selectedService: '',
         selectedTime: '', address: '', comments: '', selectedDay: 'Today',
            nameError: '', mobileNumberError: '', addressError: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.requestService = this.requestService.bind(this);
    }

    render() {
        let nameError;
        if(this.state.nameError) {
            nameError = (<label>{this.state.nameError}</label>)
        }

        let mobileNumberError;
        if(this.state.mobileNumberError) {
            mobileNumberError = (<label>this.state.mobileNumberError</label>)
        }

        let addressError;
        if(this.state.addressError) {
            addressError = (<label>this.state.addressError</label>)
        }

        let commentsError;
        if(this.state.commentsError) {
            commentsError = (<label>this.state.commentsError</label>)
        }

        return (
            <div>
                <div>Welcome to servesy mobile website</div>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" id="user-name"
                        value={this.state.name}
                         placeholder="Enter Name" onChange={(event) => this.setState({name: event.target.value})} />
                         {nameError}
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="number" className="form-control" id="user-mobile-number"
                        value={this.state.mobileNumber}
                         placeholder="Enter Mobile Number" onChange={(event)=>this.setState({mobileNumber: event.target.value})}/>
                         {mobileNumberError}
                    </div>

                    <div className="form-group">
                        <label>Select service</label>
                        <select className="form-control" onChange={(event)=>this.setState({selectedService: event.target.value})}>
                            <option value="Home Cleaning Service">Home Cleaning Service</option>
                            <option value="Sofa Cleaning">Sofa Cleaning</option>
                            <option value="Bathroom Cleaning">Bathroom Cleaning</option>

                            <option value="Laundry">Laundry</option>
                            <option value="Pest Control">Pest Control</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Preferred Time(we will reach to you for confirmation)</label>
                        <select className="form-control" onChange={(event)=>this.setState({selectedTime: event.target.value})}>
                            <option>As Soon As Possible</option>
                            <option>10:00 AM to 1:00 PM</option>
                            <option>1:00 PM to 4:00 PM</option>
                            <option>4:00 PM to 7:00 PM</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Preferred Day</label>
                        <select className="form-control" onChange={(event)=>this.setState({selectedDay: event.target.value})}>
                            <option value="Today">Today</option>
                            <option value="Tomorrow">Tomorrow</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea className="form-control" id="user-address" placeholder="Enter Address"
                         onChange={(event)=>this.setState({address: event.target.value})} />
                         {addressError}
                    </div>

                    <div className="form-group">
                        <label>Comments</label>
                        <textarea className="form-control" id="user-comments" placeholder="Enter comments if required"
                            onChange={(event)=>this.setState({comments: event.target.value})}/>
                        {commentsError}
                    </div>

                    <button type="submit" className="btn btn-primary center-block">
                        Request Service</button>
                </form>
            </div>

        );
    }

    onSubmit(e) {
        e.preventDefault();

        var validEntries = true;
        // if(this.state.name.length < 5) {
        //     this.setState({nameError: 'Enter proper name'});
        //     validEntries = false;
        // }
        //
        // if(this.state.mobileNumber.length != 10) {
        //     this.setState({mobileNumberError: 'Please Enter mobile number in proper format'});
        //     validEntries = false;
        // }

        if(validEntries) {
            this.requestService();
        }
    }

    requestService() {
        var content = this.state.name + ' ' + this.state.mobileNumber +
         ' ' + this.state.selectedService + ' ' + this.state.selectedTime +
         this.state.selectedDay + ' ' + this.state.address +
         this.state.comments;

         console.log('Content is ' + content);
         sendEmail(content, function(response) {
             if(response == null) {
                 console.log('Error occured while making request');
             } else {
                 console.log('response is ' + response);
             }
         })

    }
}

export default App;
