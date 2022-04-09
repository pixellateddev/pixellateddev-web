import { gql } from '@apollo/client';

export const RESUMES = gql`
query Resumes {
  resumes {
    id
    title
    userId
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