import React from 'react'

export default function SectionTitle ({title}: {title: string}) {
    return (
        <div className="title-container">
            <div className="square"></div>
            <span className="section-title">{title}</span>
        </div>
    )
}