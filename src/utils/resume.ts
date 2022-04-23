import moment, { Moment } from 'moment';

import { Course, Job } from '../types/resume';

interface ParsedJob {
    id?: string
    orgName: string
    role: string
    description?: string
    tenure: Moment[]
}

interface ParsedCourse {
    id?: string
    courseName: string
    instituteName: string
    tenure: Moment[]
    location: string
    score: string
}

export const parseCourse = (course: Course): ParsedCourse => {
    const { startYear, endYear, id, courseName, instituteName, location, score } = course
    const tenure = [moment(startYear)]
    endYear && tenure.push(moment(endYear))
    return {
        id, courseName, instituteName, location, score, tenure
    }
}

export const reverseParseCourse = (parsedCourse: ParsedCourse): Course => {
    const {id, instituteName, courseName, location, score, tenure } = parsedCourse
    const startYear = tenure[0].format('yyyy')

    let endYear, currentlyPersuing = true

    if (tenure.length == 2 && tenure[1]) {
        endYear = tenure[1].format('yyyy')
        currentlyPersuing = false
    }

    return {
        id: id!, instituteName, courseName, location, score, startYear, endYear, currentlyPersuing
    }
}

export const parseJob = (job: Job): ParsedJob => {
    const { startDate, endDate } = job
    const tenure = [moment(startDate)]
    endDate && tenure.push(moment(endDate))
    return {
        id: job.id,
        orgName: job.orgName,
        role: job.role,
        description: job.description,
        tenure: tenure
    }
}

export const reverseParseJob = (parsedJob: ParsedJob): Job => {
    const { id, orgName, role, description, tenure} = parsedJob

    const startDate = tenure[0].format('yyyy/MM')

    let endDate, currentlyWorking = true

    if (tenure.length == 2 && tenure[1]) {
        endDate = tenure[1].format('yyyy/MM')
        currentlyWorking = false
    }

    return {
        id: id!,
        orgName,
        role,
        description,
        startDate,
        endDate,
        currentlyWorking
    }
}