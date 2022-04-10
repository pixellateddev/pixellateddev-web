import { gql } from '@apollo/client';

import { Resume } from '../types/resume';

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