import React from 'react'
import useValidateToken from "../hooks/useValidateToken";

export default function Dashboard() {
    useValidateToken();
    return (
        <div>Dashboard</div>
    )
}
