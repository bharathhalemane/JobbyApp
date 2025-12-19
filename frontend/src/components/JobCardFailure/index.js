import './index.css'
import {Link} from 'react-router-dom'

const JObCardFailure = () => {
  return (
    <div className="job-card-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>

      <Link to="/jobs">
        <button>Retry</button>
      </Link>
    </div>
  )
}

export default JObCardFailure
