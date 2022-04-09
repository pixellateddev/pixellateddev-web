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