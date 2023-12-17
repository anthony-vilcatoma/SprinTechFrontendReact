import React from 'react'
import ConfigurationClientPage from './Client/ConfigurationClientPage';
import ConfigurationTechnicalPage from './Technical/ConfigurationTechnicalPage';

export default function ConfigurationPage() {
    const token = window.localStorage.getItem("access_token")
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const role = decodedToken.roleId;

    return (
        <>
            {role === 1 ? <ConfigurationClientPage /> : null}
            {role === 2 ? <ConfigurationTechnicalPage /> : null}
            {role === 3 ? <ConfigurationClientPage /> : null}
        </>
    )
}
