import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch , useSelector } from 'react-redux';
import { registerUser, signInUser} from '../../store/actions/users_actions';
import { TextField, Button } from '@material-ui/core';
import PreventAuthRoute from '../../hoc/preventAuthRoute';
import PasswordStrengthBar from 'react-password-strength-bar';

const Auth = (props) => {
    const [register, setRegister ] = useState(false);
    const [currentPassword, setCurrentPassword ] = useState('');
    const notifications = useSelector( state => state.notifications )
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{ email:'nikola.pacek.vetnic@gmail.com', password:'abcDEF123456!' },
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Sorry the email is required')
            .email('This is not a valid email'),
            password:Yup.string()
            .required('Sorry the password is required')
            .min(12, 'The password must be at least 12 characters long')
            .matches(RegExp('(.*[a-z]{2}.*)'), 'Two or more lowercase characters required')
            .matches(RegExp('(.*[A-Z]{2}.*)'), 'Two or more uppercase characters required')
            .matches(RegExp('(.*\\d.*)'), 'A number is required')
            .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'A special character is required')
            .test(
                'repeating',
                'Character(s) repeating too often',
                val => {

                    const arr = val.length > 0 ? val.split('') : [];
                    const map = new Map();
                    
                    for (let i = 0; i < arr.length; i++)
                        if (map.has(arr[i]))
                            map.set(arr[i], map.get(arr[i]) + 1);
                        else
                            map.set(arr[i], 1);
                    
                    const getMax = function(someMap) {
                        let maxValue;
                        for (var [key, value] of someMap)
                            maxValue = (!maxValue || maxValue < value) ? value : maxValue;
                        return maxValue;
                    }
                    
                    return getMax(map) / arr.length < 0.25;
                }
            ),
            confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit:(values,{resetForm})=>{
            handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        if(register){
            dispatch(registerUser(values))
        }else {
            dispatch(signInUser(values))
        }
    }


    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    useEffect(()=>{
        if(notifications && notifications.success){
            props.history.push('/dashboard')
        }
    },[notifications,props.history])

    return(
        <PreventAuthRoute>
            <div className="auth_container">
                <h1>Authenticate</h1>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik,'email')}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant="outlined"
                            onKeyUp={e => setCurrentPassword(e.target)}
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik,'password')}
                        />
                        {
                            register ?
                                <PasswordStrengthBar password={currentPassword.value} />
                                : null
                        }
                    </div>
                    {
                        register ?
                            <div className="form-group">
                                <TextField
                                    style={{width:'100%'}}
                                    name="confirm"
                                    label="Confirm your password"
                                    type="password"
                                    variant="outlined"
                                    {...formik.getFieldProps('confirm')}
                                    {...errorHelper(formik,'confirm')}
                                />
                            </div>
                        : null
                    }
                    <Button variant="contained" color="primary" type="submit" size="large">
                        {register ? 'Register':'Login'}
                    </Button>
                    <Button 
                        className="mt-3"
                        variant="outlined" 
                        color="secondary" 
                        size="small"
                        onClick={()=> setRegister(!register)}
                    >
                        Want to {!register ? 'Register':'Login'} ?
                    </Button>

                </form>

            </div>
        </PreventAuthRoute>
    )
}

export default Auth;