import React from 'react'

export default function ({ title, icon }) {
    return (
        <div>
            <h4>
                {icon && <i className={`fa ${icon}`}></i>}
                <span style={{ marginLeft: '15px' }}>
                    {title}
                </span>
            </h4>
            <hr />
        </div>
    )
}
