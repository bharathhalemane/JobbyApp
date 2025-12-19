import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobsCard = props => {
  const {jobDetail} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetail
  return (
    <Link className="jobs-card-link" to={`jobs/${id}`}>
      <div className="job-detail-container">
        <div className="job-heading-container">
          <img src={companyLogoUrl} className="company-logo" />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rat-con">
              <BsFillStarFill color="#fbbf24" size="20" />
              <h1>{rating}</h1>
            </div>
          </div>
        </div>
        <div className="job-detail">
          <div className="loc-emp-con">
            <p className="loc">{location}</p>
            <p className="employmentType">{employmentType}</p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="des-heading">Description</h1>
        <p className="job-des">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobsCard
