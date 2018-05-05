 import React from 'react';
 import './App.css';
 import axios from "axios";
 import ToggleButton from "./ToggleButton"

 class App extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       profiles:[],
       hasPhoto: "true"
      };
  }
  onChildChanged(newState) {
    this.setState({ hasPhoto: newState })
  }
  
  fetchProfile() { 
    axios
    .get("http://localhost:8080/filter?photo="+ (this.state.hasPhoto? "true": "false") + "&in_contacts=true&favouraite=true&compatibility_score=1&age=90&height=210&distance=300")
    .then(response => {
      const newProfiles = response.data.matches.map(c => {
        return {
          displayName: c.display_name,
          job: c.job_title,
          age: "Age: " + c.age + " yrs",
          height: "Height: " + c.height_in_cm + " cm",
          photo: c.main_photo,
          religion: "Religion: "+ c.religion,
          city: "City: " + c.city.name
        };
      });
      const newState = Object.assign({}, this.state, {profiles: newProfiles});
      this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  componentDidUpdate() {
    this.fetchProfile()
  }
  
  componentDidMount() {
    this.fetchProfile()
  }
  
  render() {
    return (
    <div>
      <nav>
        <span class="section-label">nav</span>
        <span>position: sticky; top: 0px;</span>
      </nav>
      <main>
        <div className="App">
          <Profiles profiles={this.state.profiles}/>
        </div>
        <sidebar>
          <ToggleButton text="Has Photo"
          initialChecked={this.state.hasPhoto}
          callbackParent={(newState) => this.onChildChanged(newState) } />
        </sidebar>
      </main>
    </div>
    );
   }
 }

 class Profiles extends React.Component {
   render() {
     return (
       <div className="feed">
         {this.props.profiles.map(c => <Profile displayName={c.displayName} job={c.job}
         age = {c.age} height = {c.height} photo = {c.photo} religion = {c.religion}
         city = {c.city} />)}
       </div>
     );
   }
 }

class Profile extends React.Component {
  render() {
    return (
    <div className="profile">
      <img src={this.props.photo} className="img-circular" alt="profile-img"/>
      <div className="display-job">
        <span className="content">{this.props.displayName}</span>
        <span className="job-title">{this.props.job}</span>
      </div>
      <div className="age-height">
        <span className="content">{this.props.age}</span>
        <span className="content">{this.props.height}</span>
      </div>
      <div className="religion-city">
        <span className="content">{this.props.religion}</span>
        <span className="content">{this.props.city}</span>
      </div>
    </div>)
  }
 }

 export default App;