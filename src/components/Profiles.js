import React from 'react';
import '../style/App.css';

class Profiles extends React.Component {
    render() {
      if(this.props.profiles.length !== 0) {
       return (
        <div className="feed">
          {this.props.profiles.map(c => <Profile displayName={c.displayName} job={c.job}
          age = {c.age} height = {c.height} photo = {c.photo} religion = {c.religion}
          city = {c.city} contact = {c.contact} favourite = {c.favourite} score = {c.score}/>)}
        </div>
      );
     }
     else {
       return (
         <div className="section-label">
           No result found!
         </div>
       );
     }
    }
  }
 
 class Profile extends React.Component {
   render() {
     return (
     <div className="profile">
       <img src={this.props.photo} className="img-circular" alt="profile-img"/>
       <div className="display-job">
         <span className="name">{this.props.displayName}</span>
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
       <div className="extra-content">
         <span className="content">{this.props.score}</span>
       </div>
     </div>)
   }
  }

  export default Profiles;
 