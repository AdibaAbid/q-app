import React, { useState } from 'react'
import { fbLogin, userAuth, userLogin } from '../../config/firebase'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { unsetUser, setUser } from '../../store/actions'
import { Button, Form, Alert } from 'react-bootstrap'

function Login(props) {
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory()
    console.log('props from login', props)
    const [show, setShow] = useState(false);


    async function loginWithFb() {
        try {
            const user = await fbLogin()
            history.replace('/home')
            console.log('user***', user)
            props.onLogin({ name: user.user.displayName, email: user.user.email })
            console.log('user from login function', user.user.email)
        } catch (error) {
            // setErrorMessage(error.message)
            setShow(true)
            console.log('error***', error.message)
        }
    }

    async function signUp() {
        const userEmail = document.querySelector('#formBasicEmail').value
        const userPassword = document.querySelector('#formBasicPassword').value
        const userName = document.querySelector('#formBasicName').value
        const userInfo = {
            email: userEmail,
            name: userName,
            password: userPassword
        }
      
        try {
            await userAuth(userInfo.email, userInfo.password)
            history.replace('/home')
            // console.log('From Signup signin function', user)
            props.onLogin({ name: userInfo.name, email: userInfo.email })
            // console.log('user from signup signin function', user.email)
        } catch (error) {
            setErrorMessage(error.message)
            setShow(true)
            console.log('error***', error.message)
        }
    }
    async function signIn(){
        const userEmail = document.querySelector('#formBasicEmail').value
        const userPassword = document.querySelector('#formBasicPassword').value
        const userName = document.querySelector('#formBasicName').value
        const userInfo = {
            email: userEmail,
            name: userName,
            password: userPassword
        }
            console.log('login button click')
            try {
               await userLogin(userInfo.email, userInfo.password)
                history.replace('/home')
                props.onLogin({ name: userInfo.name, email: userInfo.email })
            } catch(error){
                setErrorMessage(error.message)
                setShow(true)
                console.log('error***', error.message)
            }
     }
    

    return (
        <div>
            <div className='form-section'>
                <Form>
                    {show &&
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>{errorMessage}</Alert.Heading>
                        </Alert>
                    }
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Full Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={signIn} >
                        Login
                    </Button>
                    <Button variant="primary" onClick={signUp}>
                        SignUp
                    </Button>
                    <button className='fb-btn'
                        onClick={loginWithFb} >
                        <i className="fab fa-facebook"></i>
                    Login with Facebook</button>
                </Form>
            </div>

        </div>
    )
}





const mapStateToProps = function (state) {
    return {
        user: state.user
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        onLogin: (user) => dispatch(setUser(user)),
        onLogout: () => dispatch(unsetUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)