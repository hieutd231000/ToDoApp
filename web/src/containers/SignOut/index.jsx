import React, { useRef, useState } from 'react'
import { SignOutStyle } from './index.style'

import { useNavigate } from 'react-router-dom'

const SignOut = () => {
    const navigate = useNavigate()

    return (
        
        <SignOutStyle>
            <div className='Bottom'>
                <p onClick={() => navigate('/sign-in')}>サインアウト</p>
            </div>
        </SignOutStyle>
       
    )
}

export default SignOut