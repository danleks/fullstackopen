// export interface Part {
//     name: string,
//     exerciseCount: number
// }
//
// export interface SingePartProp {
//     part: Part
// }
//
// export interface CourseParts {
//     parts: Part[]
// }

export interface CourseName {
    name: string
}

interface CoursePartBase {
    name: string,
    exerciseCount: number,
    type: string
}

interface CoursePartBaseWithDesc extends CoursePartBase{
    description: string,
}

interface CoursePartNormal extends CoursePartBaseWithDesc {
    type: 'normal',
}

interface CoursePartGroupProject extends CoursePartBase {
    type: 'groupProject',
    groupProjectCount: number,
}

interface CoursePartSubmission extends CoursePartBaseWithDesc {
    type: 'submission',
    exerciseSubmissionLink: string,
}

interface CoursePartSpecial extends CoursePartBaseWithDesc {
    type: 'special',
    requirements: string[],
}

export type CoursePart = CoursePartNormal | CoursePartGroupProject | CoursePartSubmission | CoursePartSpecial;

