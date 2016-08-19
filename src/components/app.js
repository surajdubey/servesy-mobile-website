import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
        <div>
            <div>Welcome to servesy mobile website</div>

            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="user-name" placeholder="Enter Name" />
                </div>

                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="number" className="form-control" id="user-mobile-number" placeholder="Enter Mobile Number" />
                </div>

                <div className="form-group">
                    <label>Select service</label>
                    <select className="form-control">
                        <option>Home Cleaning Service</option>
                        <option>Sofa Cleaning</option>
                        <option>Bathroom Cleaning</option>

                        <option>Laundry</option>
                        <option>Pest Control</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Preferred Time(we will reach to you for confirmation)</label>
                    <select className="form-control">
                        <option>As Soon As Possible</option>
                        <option>10:00 AM to 1:00 PM</option>
                        <option>1:00 PM to 4:00 PM</option>
                        <option>4:00 PM to 7:00 PM</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control" id="user-address" placeholder="Enter Address" />
                </div>

                <div className="form-group">
                    <label>Comments</label>
                    <textarea className="form-control" id="user-comments" placeholder="Enter comments if required" />
                </div>

                <button type="button" className="btn btn-primary center-block">Request Service</button>
            </form>
        </div>

    );
  }
}

export default App;
