import React from 'react';
import axios from 'axios';



const initialState = {
  firstname: "",
  lastname: "",
  email:"",
  password: "",
  mob:"",
  gender:"",
  confirmpassword: "",
  firstnameError: "",
  lastnameError: "",
  confirmpasswordError: ""
}

export default class Formdata extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.state = initialState;
  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })

  };

  validate = () => {

    let firstnameError = "";
    let lastnameError = "";
    let confirmpasswordError = "";

    if (!this.state.firstname) {
      firstnameError = "FirstName cannot be blank"
    }

    if (!this.state.lastname) {
      lastnameError = "LastName cannot be blank"
    }

    if (this.state.password !== this.state.confirmpassword) {
      confirmpasswordError = "Password doesnot match"
    }


    if (firstnameError || lastnameError || confirmpasswordError) {
      this.setState({ firstnameError, lastnameError, confirmpasswordError });
      return false;
    }



    return true;

  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email:this.state.email,
        password: this.state.password,
        mob:this.state.mob,
        gender:this.state.gender
      };

      axios.post('http://localhost:3000/users', user).then((res) => {
        console.log(res);
        console.log(res.data.response);
      });
      this.setState(initialState);
    }  
  };

  render() {

    return (
      <div className="form">

        <form onSubmit={this.handleSubmit}>

          <div>
            <label>First Name: </label>
            <input
              placeholder="FirstName"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.firstnameError}
            </div>
          </div>

          <div>
            <label>Last Name: </label>
            <input
              placeholder="LastName"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.lastnameError}
            </div>
          </div>

          <div>
            <label>Email: </label>
            <input
              type="text"
              name="email"
              placeholder="Email ID"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>Confirm Password: </label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={this.state.confirmpassword}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.confirmpasswordError}
            </div>
          </div>


          <div>
            <label>Mobile No.: </label>
            <input
              type="number"
              name="mob"
              placeholder="Mobile No."
              value={this.state.mob}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>Gender: </label>
            <input
              type="text"
              name="gender"
              placeholder="GENDER"
              value={this.state.gender}
              onChange={this.handleChange}
            />
          </div>

          <button>Submit</button>

        </form>

      </div>


    );

  }


}

export{initialState}