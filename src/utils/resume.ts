import moment, { Moment } from 'moment';

import { Job } from '../types/resume';

interface ParsedJob {
    id?: string
    orgName: string
    role: string
    description?: string
    tenure: Moment[]
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