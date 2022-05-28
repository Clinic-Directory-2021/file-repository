import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

export default function File({ file }) {
    return (
        <a href={file.url} target="_blank" className="btn btn-outline-dark text-truncate w-100" >
            <FontAwesomeIcon icon={faFile} className="mr-2" style={{ marginRight: "10px" }} />
            {file.name}
        </a>
    )
}
