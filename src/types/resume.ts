export interface PersonalDetails {
    fullName: string
    currentRole?: string
    location: string
    email: string
    phoneNumber: string
    website?: string
    github?: string
    linkedin?: string
}


export interface Resume {
    id: string
    title: string
    personalDetails?: PersonalDetails
}