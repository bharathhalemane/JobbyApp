import './index.css'
import {BsFillStarFill} from 'react-icons/bs'

const SimilarJobsCard = props => {
  const {similarJobDetail} = props
  console.log(similarJobDetail)
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobDetail
  return (
    <div className="similar-job-detail-container">
      <div className="similar-job-heading-container">
        <img src={companyLogoUrl} className="company-logo" />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rat-con">
            <BsFillStarFill color="#fbbf24" size="20" />
            <h1>{rating}</h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="des-heading">Description</h1>
        <p className="job-des">{jobDescription}</p>
      </div>
      <div className="job-detail">
        <div className="loc-emp-con">
          <p className="loc">{location}</p>
          <p className="employmentType">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobsCard
