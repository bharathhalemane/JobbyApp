import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
class ProfileCard extends Component {
  state = {profileDetails: {}, profileStatus: true}
  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const {profile_details} = data
      const updatedData = {
        name: profile_details.name,
        profileImageUrl: profile_details.profile_image_url,
        shortBio: profile_details.short_bio,
      }
      this.setState({profileDetails: updatedData})
    } else {
      this.setState({profileStatus: false})
    }
  }
  render() {
    const {profileDetails, profileStatus} = this.state
    return profileStatus ? (
      <div className="ProfileCard-container">
        <img
          className="profile-image"
          src={profileDetails.profileImageUrl}
          alt=""
        />
        <h1 className="name">{profileDetails.name}</h1>
        <p className="shortBio">{profileDetails.shortBio}</p>
      </div>
    ) : (
      <div className="profile-card-failure">
        <div>
          <button className="retry-button" onClick={this.getProfileDetails()}>
            Retry
          </button>
        </div>
      </div>
    )
  }
}

export default ProfileCard
