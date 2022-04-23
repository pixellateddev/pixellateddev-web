import { gql } from '@apollo/client';

import { Resume } from '../types/resume';

export interface GET_RESUMES_DATA {
  resumes: Resume[]
}

export const RESUMES = gql`
query Resumes {
  resumes {
    id
    title
    userId
  }
}
`

export interface GET_RESUME_DATA {
  resume: Resume
}

export const GET_RESUME = gql`
query Resume($resumeId: ID!) {
  resume(resumeId: $resumeId) {
    id
    title
    userId
    personalDetails {
      fullName
      location
      phoneNumber
      email
      currentRole
      website
      github
      linkedin
    }
    workExperience {
      id
      role
      orgName
      startDate
      endDate
      currentlyWorking
      description
    }
    educationDetails {
      id
      courseName
      instituteName
      startYear
      endYear
      currentlyPersuing
      location
      score
    }
  }
}
`


export const CREATE_RESUME = gql`
mutation CreateResume($title: String!) {
  createResume(title: $title) {
    id
    title
  }
}
`

export const DELETE_RESUME = gql`
mutation Mutation($resumeId: ID!) {
  deleteResume(resumeId: $resumeId) {
    status
    message
    code
  }
}
`


export const EDIT_PERSONAL_DETAILS = gql`
mutation EditPersonalDetails($resumeId: ID!, $personalDetails: PersonalDetailsInput!) {
  editPersonalDetails(resumeId: $resumeId, personalDetails: $personalDetails) {
    id
    personalDetails {
      fullName
      location
      phoneNumber
      email
      currentRole
      website
      github
      linkedin
    }
  }
}`

export const ADD_NEW_JOB = gql`
mutation Mutation($resumeId: ID!, $newJob: NewJobInput!) {
  addJobExperience(resumeId: $resumeId, newJob: $newJob) {
    title
    id
    workExperience {
      id
      role
      orgName
      startDate
      endDate
      currentlyWorking
      description
    }
  }
}
`

export const DELETE_JOB = gql`
mutation Mutation($resumeId: ID!, $jobId: ID!) {
  deleteJobExperience(resumeId: $resumeId, jobId: $jobId) {
    id
    workExperience {
      id
      role
      orgName
      startDate
      endDate
      currentlyWorking
      description
    }
  }
}
`

export const UPDATE_JOB = gql`
mutation Mutation($resumeId: ID!, $jobId: ID!, $job: NewJobInput!) {
  updateJobExperience(resumeId: $resumeId, jobId: $jobId, job: $job) {
    id
    workExperience {
      id
      role
      orgName
      startDate
      endDate
      currentlyWorking
      description
    }
  }
}
`

export const ADD_NEW_COURSE = gql`
mutation Mutation($resumeId: ID!, $course: NewCourseInput!) {
  addCourse(resumeId: $resumeId, course: $course) {
    id
    userId
    title
    educationDetails {
      currentlyPersuing
      endYear
      startYear
      id
      courseName
      instituteName
      location
      score
    }
  }
}`


export const DELETE_COURSE = gql`
mutation Mutation($resumeId: ID!, $courseId: ID!) {
  deleteCourse(resumeId: $resumeId, courseId: $courseId) {
    id
    educationDetails {
      currentlyPersuing
      endYear
      startYear
      id
      courseName
      instituteName
      location
      score
    }
  }
}
`

export const UPDATE_COURSE = gql`
mutation Mutation($resumeId: ID!, $courseId: ID!, $course: NewCourseInput!) {
  updateCourse(resumeId: $resumeId, courseId: $courseId, course: $course) {
    id
    educationDetails {
      currentlyPersuing
      endYear
      startYear
      id
      courseName
      instituteName
      location
      score
    }
  }
}
`