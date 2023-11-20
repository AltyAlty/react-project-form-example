/*
Атрибут "htmlFor" в React является аналогом атрибута "for".
"useId" это часть React, которая позволяет генерировать ID.
*/
import {useId} from 'react';
import {useForm} from 'react-hook-form';
import './login-form.css';

type FormData = {
    email: string
    password: string
    confirmPassword: string
    rememberMe: boolean
};

export const LoginForm = () => {
    const emailID = useId();
    const passwordID = useId();
    const confirmPasswordID = useId();
    const emailErrorMessageID = useId();
    const passwordErrorMessageID = useId();
    const confirmPasswordErrorMessageID = useId();

    const {
        register,
        handleSubmit,
        formState: {isSubmitting, errors}
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <div className='form-control'>
            <div>
                <label htmlFor={emailID}>Email:</label>
            </div>

            <div>
                <input
                    id={emailID}
                    // name='email'
                    type='email'
                    autoComplete='email'
                    aria-describedby={emailErrorMessageID}
                    // required
                    {...register('email', {required: 'The field is required'})}
                    className='email-input'
                />
            </div>

            <div>
                {errors.email && (
                    <p id={emailErrorMessageID} aria-live='assertive' className='email-error-message'>
                        Error: {errors.email.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div>
                <label htmlFor={passwordID}>Password:</label>
            </div>

            <div>
                <input
                    id={passwordID}
                    // name='password'
                    type='password'
                    autoComplete='new-password'
                    aria-describedby={passwordErrorMessageID}
                    // required
                    // minLength={8}
                    {...register('password', {
                        required: 'The field is required',
                        minLength: {
                            value: 8,
                            message: 'Min length is 8 characters'
                        }
                    })}
                    className='password-input'
                />
            </div>

            <div>
                {errors.password && (
                    <p id={passwordErrorMessageID} aria-live='assertive' className='password-error-message'>
                        Error: {errors.password.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div>
                <label htmlFor={confirmPasswordID}>Confirm password:</label>
            </div>

            <div>
                <input
                    id={confirmPasswordID}
                    // name='confirm-password'
                    type='password'
                    autoComplete='new-password'
                    aria-describedby={confirmPasswordErrorMessageID}
                    // required
                    // minLength={8}
                    {...register('confirmPassword', {
                        required: 'The field is required',
                        minLength: {
                            value: 8,
                            message: 'Min length is 8 characters'
                        }
                    })}
                    className='confirm-password-input'
                />
            </div>

            <div>
                {errors.confirmPassword && (
                    <p id={confirmPasswordErrorMessageID} aria-live='assertive'
                       className='confirm-password-error-message'>
                        Error: {errors.confirmPassword.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control-remember-me'>
            <label>
                Remember me?
                <input
                    // name='rememberMe'
                    type='checkbox'
                    {...register('rememberMe')}
                    className='remember-me-input'
                />
            </label>
        </div>

        <div className='submit-button-container'>
            <button disabled={isSubmitting} type='submit' className='submit-button'>SIGN UP</button>
        </div>
    </form>
};