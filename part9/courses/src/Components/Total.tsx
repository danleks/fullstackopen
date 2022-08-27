import React from 'react';
import {CoursePart} from "../../types";

const Total = ({parts} : {parts: CoursePart[]}) => {
    return (
        <div>
            Number of exercises{" "}
            {parts.reduce((acc, part) => acc + part.exerciseCount, 0)}
        </div>
    );
};

export default Total;