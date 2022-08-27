import React from 'react';
import {CoursePart} from "../../types";


const Part = ({part} : {part: CoursePart}) => {
    switch (part.type) {
        case 'normal':
            return (
                <li style={{paddingBottom: '10px'}}>
                    <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
                    <em>{part.description}</em>
                </li>
            )
        case 'groupProject':
            return (
                <li style={{paddingBottom: '10px'}}>
                    <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
                    <em>project exercises: {part.groupProjectCount}</em>
                </li>
            )
        case 'submission':
            return (
                <li style={{paddingBottom: '10px'}}>
                    <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
                    <em>{part.description}</em>
                    <div>submit to {part.exerciseSubmissionLink}</div>
                </li>
            )
        case 'special':
            return (
                <li style={{paddingBottom: '10px'}}>
                    <h4 style={{margin: 0}}>{part.name} {part.exerciseCount}</h4>
                    <em>{part.description}</em>
                    <div>required skills {part.requirements.map(skill => skill).join(', ')}</div>
                </li>
            )
        default:
            const _exhaustiveCheck: never = part
            return _exhaustiveCheck
            // return asserNever(part)
    }
};

export default Part;