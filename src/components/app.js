import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import config from '../../config';
import sendEmail from '../sendEmail';

const recaptchaVerifyCallback = (response) => {
    console.log('verified');
}

const callback = () => {
    console.log('callback');
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', mobileNumber: '', selectedService: 'Home Cleaning Service',
         selectedTime: 'As Soon As Possible', address: '', comments: '', selectedDay: 'Today',
            nameError: '', mobileNumberError: '', addressError: '', serviceBooked: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.requestService = this.requestService.bind(this);
    }

    render() {
        let nameError;
        if(this.state.nameError) {
            nameError = (<div className="alert alert-danger error-message">
                            {this.state.nameError}
                        </div>)
        }

        let mobileNumberError;
        if(this.state.mobileNumberError) {
            mobileNumberError = (<div className="alert alert-danger error-message">
                                    {this.state.mobileNumberError}
                                </div>)
        }

        let addressError;
        if(this.state.addressError) {
            addressError = (<div className="alert alert-danger error-message">
                                {this.state.addressError}
                            </div>)
        }

        let commentsError;
        if(this.state.commentsError) {
            commentsError = (<label>this.state.commentsError</label>)
        }

        let serviceBookedMessage;
        if(this.state.serviceBooked == 'true') {
            serviceBookedMessage = (<div className="alert alert-success"><strong>
                                "Service request is booked successfully. We will reach to you very soon"
                                     </strong>
                                    </div>)
        } if(this.state.serviceBooked == 'false') {
            serviceBookedMessage = (<div className="alert alert-danger"><strong>
                                "There was some error while booking your request. Please try again after some time"
                                     </strong>
                                    </div>)
        }

        return (
            <div>
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
                            <option value="This week">This week</option>
                            <option value="Next week">Next week</option>
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

                    {serviceBookedMessage}

                    <button type="submit" className="btn btn-primary center-block">
                        Request Service</button>

                    <Recaptcha
                        sitekey={config.GOOGLE_RECATCHA_SITE_KEY}
                        size="compact"
                        render="explicit"
                        verifyCallback={recaptchaVerifyCallback}
                        onloadCallback={callback}
                        />
                </form>
            </div>

        );
    }

    onSubmit(e) {
        e.preventDefault();

        //remove all error messages
        this.setState({nameError: '', mobileNumberError: '', addressError: ''})

        var validEntries = true;
        if(this.state.name.length < 5) {
            this.setState({nameError: 'Name must have at least 5 characters'});
            validEntries = false;
        }

        if(this.state.mobileNumber.length != 10) {
            this.setState({mobileNumberError: 'Mobile number must have 10 digits'});
            validEntries = false;
        }

        if(this.state.address.length == 0) {
            this.setState({addressError: 'Please enter address'});
            validEntries = false;
        }

        if(validEntries) {
            var data = {
                name: this.state.name,
                mobileNumber: this.state.mobileNumber,
                service: this.state.selectedService,
                selectedTime: this.state.selectedTime,
                selectedDay: this.state.selectedDay,
                address: this.state.address,
                comments: this.state.comments
            }

            this.requestService(data);
        }
    }

    requestService(data) {

         console.log('Data to be submitted is ' + JSON.stringify(data));
         sendEmail(data, response => {
             if(response == null) {
                 this.setState({serviceBooked: 'false'});
                 console.log('Error occured while making request');
             } else {
                 this.setState({serviceBooked: 'true'});
                 console.log('response is ' + response);
             }
         })

    }
}


export default App;
