import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'
const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <h1 className="heading">Find the Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job That first your abilities and potential.
        </p>
        <button className="logout-button">
          <Link className="link-items" to="/jobs">
            Find Jobs
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Home
