 import React from 'react';
 import '../style/App.css';
 import axios from "axios";
 import ToggleButton from "./ToggleButton"
 import RangeSlider from "./RangeSlider"
 import no_photo from "../image/no-user-image.png"

 class App extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       profiles:[],
       hasPhoto: true,
       inContact: true,
       favourite: true,
       age: 50,
       minAge: 18,
       maxAge: 95,
       compScore: 99,
       minScore: 1,
       maxScore: 99
      };
  }

  componentDidMount() {
    this.fetchProfile(this.state.hasPhoto, this.state.inContact, this.state.favourite, 
      this.state.age, this.state.compScore)
  }
  
  onPhotoChanged(newState) {
    this.fetchProfile(newState, this.state.inContact, this.state.favourite, 
      this.state.age, this.state.compScore);
  }

  onContactChanged(newState) {
    this.fetchProfile(this.state.hasPhoto, newState, this.state.favourite, 
      this.state.age, this.state.compScore);
  }

  onFavouriteChanged(newState) {
    this.fetchProfile(this.state.hasPhoto, this.state.inContact, newState, 
      this.state.age, this.state.compScore);
  }

  onAgeSlide(newState) {
    this.fetchProfile(this.state.hasPhoto, this.state.inContact, this.state.favourite, 
      newState, this.state.compScore);
  }
  onScoreSlide(newState) {
    this.fetchProfile(this.state.hasPhoto, this.state.inContact, this.state.favourite, 
      this.state.age, newState);
  }
  
  fetchProfile(hasPhoto, inContact, favourite, age, score) { 
    axios.get("http://localhost:8080/filter?photo="+ 
    (hasPhoto? "true": "false") + 
    "&in_contacts="+ (inContact? "true": "false") + 
    "&favouraite=" + (favourite? "true": "false")
    +"&compatibility_score=".concat(score/100) + 
    "&age=".concat(age) + "&height=210&distance=300")
    .then(response => {
      const newProfiles = response.data.matches.map(c => {
        return {
          displayName: c.display_name,
          job: c.job_title,
          age: "Age: " + c.age + " yrs",
          height: "Height: " + c.height_in_cm + " cm",
          photo: (hasPhoto? c.main_photo : no_photo),
          religion: "Religion: "+ c.religion,
          city: "City: " + c.city.name,
          contact: "Contacts Exchanged: "+ c.contacts_exchanged,
          favourite: "Favourite: " + c.favourite
        };
      });
      const newState = Object.assign({}, this.state, {profiles: newProfiles, 
        hasPhoto: hasPhoto, inContact:inContact, favourite: favourite, age: age, compScore:score});
      this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
    <div>
      <nav>
        <h2 className="section-label">Profile Matcher</h2>
      </nav>
      <div className="filterContainer">
      <h3 className="filterHeader">Filters</h3>
      <sidebar>
        <div>
          <ToggleButton text="Has Photo"
          initialChecked={this.state.hasPhoto}
          callbackParent={(newState) => this.onPhotoChanged(newState) } />
        </div>
        <div>
          <ToggleButton text="In Contact"
          initialChecked={this.state.inContact}
          callbackParent={(newState) => this.onContactChanged(newState) } />
        </div>
        <div>
          <ToggleButton text="Favourite"
          initialChecked={this.state.favourite}
          callbackParent={(newState) => this.onFavouriteChanged(newState) } />
        </div>
        <div>
            <label for = "age">
              Age (Years) ?
              <RangeSlider
              initialValue = {this.state.age}  min = {this.state.minAge} max = {this.state.maxAge}
              callbackParent = {(newState) => this.onAgeSlide(newState)} />
            </label>
        </div>
        <div>
            <label for = "compatibility-score">
              Compatibility Score (%) ?
              <RangeSlider
              initialValue = {this.state.compScore} min = {this.state.minScore} max = {this.state.maxScore}
              callbackParent = {(newState) => this.onScoreSlide(newState)} />
            </label>
        </div>
      </sidebar>
      </div>
      <main>
        <div className="App">
          <Profiles profiles={this.state.profiles}/>
        </div>
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
         city = {c.city} contact = {c.contact} favourite = {c.favourite} />)}
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
      <div className="extra-content">
        <span className="content">{this.props.age}</span>
        <span className="content">{this.props.height}</span>
      </div>
      <div className="extra-content">
        <span className="content">{this.props.religion}</span>
        <span className="content">{this.props.city}</span>
      </div>
      <div className="extra-content">
        <span className="content">{this.props.contact}</span>
        <span className="content">{this.props.favourite}</span>
      </div>
    </div>)
  }
 }

 export default App;