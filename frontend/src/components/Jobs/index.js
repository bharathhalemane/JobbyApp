import Header from '../Header'
import ProfileCard from '../ProfileCard'
import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobsCard from '../JobsCard'
import JobCardFailure from '../JobCardFailure'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryType: '',
    searchText: '',
    jobsList: [],
    responseFailure: false,
  }

  componentDidMount = () => {
    this.onGetJobs()
  }

  onChangeEmploymentType = event => {
    const {value} = event.target

    this.setState(prevState => {
      const updatedTypes = prevState.employmentType.includes(value)
        ? prevState.employmentType.filter(each => each !== value)
        : [...prevState.employmentType, value]

      return {employmentType: updatedTypes}
    }, this.onGetJobs)
  }

  onChangeSalary = event => {
    this.setState({salaryType: event.target.value}, this.onGetJobs)
  }

  onChangeSearchText = e => {
    this.setState({searchText: e.target.value})
  }

  onSubmitSearchInput = e => {
    e.preventDefault()
    this.onGetJobs()
    this.setState({searchText: ''})
  }

  onGetJobs = async () => {
    const {employmentType, salaryType, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryType}&search=${searchText}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: updatedData})
    } else {
      this.setState({responseFailure: true})
    }
  }

  render() {
    const {employmentType, salaryType, searchText, jobsList, responseFailure} =
      this.state

    const renderJobsPage = () => {
      return (
        <div className="jobs-container">
          <div className="filter-container">
            <ProfileCard />
            <hr />
            <div className="employement-filter-container">
              <h1 className="filter-heading">Type of Employement</h1>
              <ul className="filter-con">
                {employmentTypesList.map(each => {
                  return (
                    <li className="filters" key={each.employmentTypeId}>
                      <input
                        type="checkbox"
                        id={each.employmentTypeId}
                        value={each.employmentTypeId}
                        checked={employmentType.includes(each.employmentTypeId)}
                        onChange={this.onChangeEmploymentType}
                      />
                      <label htmlFor={each.employmentTypeId}>
                        {each.label}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
            <hr />
            <div className="salary-filter-container">
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="filter-con">
                {salaryRangesList.map(each => {
                  return (
                    <li className="filters" key={each.salaryRangeId}>
                      <input
                        type="radio"
                        name="salary"
                        id={each.salaryRangeId}
                        value={each.salaryRangeId}
                        checked={salaryType === each.salaryRangeId}
                        onChange={this.onChangeSalary}
                      />
                      <label htmlFor={each.salaryRangeId}>{each.label}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="jobs-details-container">
            <form
              className="search-container"
              onSubmit={this.onSubmitSearchInput}
            >
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={this.onChangeSearchText}
              />
              <button type="submit" className="search-button">
                <BsSearch />
              </button>
            </form>
            <div className="jobs-list-container">
              {jobsList.length > 0 ? (
                <ul>
                  {jobsList.map(each => (
                    <JobsCard jobDetail={each} key={each.id} />
                  ))}
                </ul>
              ) : (
                <div className="jobs-search-failure">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                    alt="no jobs"
                  />
                  <h1>No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <Header />
        {responseFailure && <JobCardFailure />}
        {renderJobsPage()}
      </div>
    )
  }
}

export default Jobs
