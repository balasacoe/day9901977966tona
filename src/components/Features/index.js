import React from 'react';
export default function Features(props) {
    const { features, className } = props;
    let featureList=features && features.map((item, index) => {
        return (<div key={index} className={className}>
            {(index + 1)}. {item}
        </div>);
    });
    return featureList;
}