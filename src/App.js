 import React from 'react';
 import './style/App.css';
 import axios from "axios";
 import ToggleButton from "./components/ToggleButton";
 import RangeSlider from "./components/RangeSlider";
 import Profiles from "./components/Profiles";
 import no_photo from "./image/no-user-image.png";

 class App extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       profiles:[],
       hasPhoto: true,
       inContact: true,
       favourite: true,
       minAge: 18,
       maxAge: 90,
       compScore: 99,
       height: 180
      };
  }

  componentDidMount() {
    this.fetchApi(this.state.hasPhoto, this.state.inContact, this.state.favourite,
      this.state.minAge, this.state.maxAge, this.state.compScore, this.state.height)
  }
  
  onPhotoChanged(newState) {
    this.fetchApi(newState, this.state.inContact, this.state.favourite,
      this.state.minAge, this.state.maxAge, this.state.compScore, this.state.height);
  }

  onContactChanged(newState) {
    this.fetchApi(this.state.hasPhoto, newState, this.state.favourite,
      this.state.minAge, this.state.maxAge, this.state.compScore, this.state.height);
  }

  onFavouriteChanged(newState) {
    this.fetchApi(this.state.hasPhoto, this.state.inContact, newState,
      this.state.minAge, this.state.maxAge, this.state.compScore, this.state.height);
  }

  onMinAgeSlide(newState) {
    this.fetchApi(this.state.hasPhoto, this.state.inContact, this.state.favourite,
      newState, this.state.maxAge, this.state.compScore, this.state.height);
  }

  onMaxAgeSlide(newState) {
    this.fetchApi(this.state.hasPhoto, this.state.inContact, this.state.favourite,
      this.state.minAge, newState, this.state.compScore, this.state.height);
  }

  onScoreSlide(newState) {
    this.fetchApi(this.state.hasPhoto, this.state.inContact, this.state.favourite,
      this.state.minAge, this.state.maxAge, newState, this.state.height);
  }

  onHeightSlide(newState) {
    this.fetchApi(this.state.hasPhoto, this.state.inContact, this.state.favourite,
      this.state.minAge, this.state.maxAge, this.state.compScore, newState);
  }
  
  fetchApi(hasPhoto, inContact, favourite, minAge, maxAge, score, height) { 
    var uri = "/filter?photo="+ (hasPhoto? "true": "false") +
    "&in_contacts="+ (inContact? "true": "false") + "&favouraite=" + (favourite? "true": "false")+
    "&compatibility_score=".concat(score/100) + "&minAge=".concat(minAge) + "&maxAge=".concat(maxAge) +
    "&height=".concat(height) + "&distance=300"
    axios.get(uri)
    .then(response => {
      const newProfiles = response.data.matches === null? [] : response.data.matches.map(c => {
        return {
          displayName: c.display_name,
          job: c.job_title,
          age: "Age: " + c.age + " yrs",
          height: "Height: " + c.height_in_cm + " cm",
          photo: (hasPhoto? c.main_photo : no_photo),
          religion: "Religion: "+ c.religion,
          city: "City: " + c.city.name,
          contact: "Contacts Exchanged: "+ c.contacts_exchanged,
          favourite: "Favourite: " + c.favourite,
          score: "Compatibility Score: " + c.compatibility_score *100 + "%"
        };
      });
      const newState = Object.assign({}, this.state, {profiles: newProfiles, 
        hasPhoto: hasPhoto, inContact:inContact, favourite: favourite, minAge: minAge, maxAge: maxAge,
        height: height, compScore:score});
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
            <label for = "minAge">
              Min Age (Years) ?
              <RangeSlider
              initialValue = {this.state.minAge}  min = {18} max = {95}
              callbackParent = {(newState) => this.onMinAgeSlide(newState)} />
            </label>
        </div>
        <div>
            <label for = "maxAge">
              Max Age (Years) ?
              <RangeSlider
              initialValue = {this.state.maxAge}  min = {18} max = {95}
              callbackParent = {(newState) => this.onMaxAgeSlide(newState)} />
            </label>
        </div>
        
        <div>
            <label for = "compatibility-score">
              Compatibility Score (%) ?
              <RangeSlider
              initialValue = {this.state.compScore} min = {1} max = {99}
              callbackParent = {(newState) => this.onScoreSlide(newState)} />
            </label>
        </div>
        <div>
            <label for = "height">
              Height (cm) ?
              <RangeSlider
              initialValue = {this.state.height} min = {135} max = {210}
              callbackParent = {(newState) => this.onHeightSlide(newState)} />
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

 export default App;