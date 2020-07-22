import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from './ProfileItem';
import { getProfiles } from "../../actions/profile";


const Profiles = ({ profile: { loading, profiles }, getProfiles }) => {
  useEffect(() => {
      getProfiles();
  },[getProfiles]);
  
  return <Fragment>
   {
       !loading ? <Fragment>
           <h1 className="large text-primary">Developer</h1>
           <p className = "lead"> 
            <i className="fab fa-connectdevelop"></i>
            Browse and Connect with Developers
           </p>
           <div className="profiles">
            {
                profiles.length > 0 ? (
                    profiles.map( (profile) => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : <h1>No profile found</h1>
            }
           </div>
       </Fragment> : <Spinner />
   }
  </Fragment>;
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
