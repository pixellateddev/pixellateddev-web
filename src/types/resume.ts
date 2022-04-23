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

export interface Job {
    id: string
    orgName: string
    role: string
    startDate: string
    currentlyWorking: boolean
    endDate?: string
    description?: string
}

export interface Course {
    id: string
    courseName: string
    instituteName: string
    startYear: string
    endYear?: string
    currentlyPersuing: boolean
    location: string
    score: string
}


export interface Resume {
    id: string
    title: string
    personalDetails?: PersonalDetails
    workExperience?: Job[]
    educationDetails?: Course[]
}