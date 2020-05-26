import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router';

const MediaManager = ({ user }) => {
    const { authService } = useOktaAuth();

    const logout = async () => {
        authService.logout('/');
    }
    
    const hasLinkedAccounts = () => user.twitter_screenName;

    if(!hasLinkedAccounts()) {
        return <Redirect to='/app/link-accounts'/>
    }

    return (
        <>
            { user &&
            <div>
                <h4>User:</h4>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
                <hr />
                <button onClick={logout}>Logout</button>
            </div> }
        </>
    );
};

export default MediaManager;
