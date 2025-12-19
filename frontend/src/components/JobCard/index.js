import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import {BsFillStarFill} from 'react-icons/bs'
import JobCardFailure from '../JobCardFailure'
// import {CiShare1} from 'react-icons/ci'

import './index.css'

class JobCard extends Component {
  state = {jobData: {}, similarData: [], responseFailure: false}
  componentDidMount = () => {
    this.getJobCardData()
  }

  getFormatedSkillData = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getFormatedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    title: data.title,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(each => this.getFormatedSkillData(each)),
  })

  getSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobCardData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok) {
      const data = await response.json()

      const formatedData = this.getFormatedData(data.job_details)
      const similarData = data.similar_jobs.map(each =>
        this.getSimilarData(each),
      )

      this.setState({jobData: formatedData, similarData: similarData})
    } else {
      this.setState({responseFailure: true})
    }
  }

  render() {
    const {jobData, similarData, responseFailure} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      rating,
      location,
      jobDescription,
      packagePerAnnum,
      lifeAtCompany,
      skills,
      title,
    } = jobData

    const renderSkills = () => {
      if (!skills) return null

      return (
        <div className="skills-container">
          {skills.map(each => (
            <div className="skill-con" key={each.name}>
              <img src={each.imageUrl} alt={each.name} />
              <h1 className="skill-name">{each.name}</h1>
            </div>
          ))}
        </div>
      )
    }

    const renderLifeAtCompany = () => {
      if (!lifeAtCompany) return null
      const {description, imageUrl} = lifeAtCompany
      return (
        <div className="lifeatcom-con">
          <div className="lifeatcom-des">
            <h1>Life at Company</h1>
            <p>{description}</p>
          </div>
          <img className="lifeatcom-image" src={imageUrl} />
        </div>
      )
    }

    const renderSimilarJobsCard = () => {
      if (!similarData || similarData.length === 0) return null

      return (
        <div className="similar-job-container">
          <h1>Similar Jobs</h1>
          <div className="similar-jobs-items">
            {similarData.map(each => (
              <SimilarJobsCard key={each.id} similarJobDetail={each} />
            ))}
          </div>
        </div>
      )
    }

    const renderJobCardPage = () => {
      return (
        <div className="job-card-page">
          <div className="job-card-container">
            <div className="job-card-heading-container">
              <img src={companyLogoUrl} className="job-company-logo" />
              <div className="job-title-container">
                <h1 className="job-title">{title}</h1>
                <div className="job-rat-con">
                  <BsFillStarFill color="#fbbf24" size="20" />
                  <h1 className="job-rating">{rating}</h1>
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
            <div className="heading-container">
              <h1 className="des-heading">Description</h1>
              <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                Visit
              </a>
            </div>
            <p className="job-des">{jobDescription}</p>
            <h1 className="des-heading">Skills</h1>
            {renderSkills()}
            {renderLifeAtCompany()}
          </div>
          {renderSimilarJobsCard()}
        </div>
      )
    }

    return (
      <div className="">
        <Header />
        {responseFailure && <JobCardFailure />}
        {renderJobCardPage()}
      </div>
    )
  }
}

export default JobCard
