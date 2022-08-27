import React from 'react';
//import {CourseParts, SingePartProp} from "../../types";
import Part from "./Part";
import {CoursePart} from "../../types";

const styles = {
    listStyle: 'none'
}

const Content = ({parts} : {parts: CoursePart[]}) => {
    return (
        <ul style={styles}>
            {parts.map((part) => {
                return (
                    <Part key={part.name} part={part}/>
                )
            })}
        </ul>
    );
};

export default Content;