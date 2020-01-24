import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
const LoginRegisterButtons = ({history}) => {
    return (  
    <React.Fragment>
        <Button onClick={()=> history.push('/login')}>Přihlásit se</Button>
        <Button onClick={()=> history.push('/registration')}>Registrovat</Button> 
    </React.Fragment>
    );
}
 
export default LoginRegisterButtons;