/*
Атрибут "htmlFor" в React является аналогом атрибута "for".
"useId" это часть React, которая позволяет генерировать ID.
*/
import {useId} from 'react';
import {useForm} from 'react-hook-form';

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

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
            <label htmlFor={emailID}>Email</label>
            <input
                id={emailID}
                // name='email'
                type='email'
                autoComplete='email'
                aria-describedby={emailErrorMessageID}
                // required
                {...register('email', {required: 'The field is required'})}
            />

            Error: {errors.email && (
            <p id={emailErrorMessageID} aria-live='assertive'>
                {errors.email.message}
            </p>
        )}
        </div>

        <div className='form-control'>
            <label htmlFor={passwordID}>Password</label>
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
            />

            Error: {errors.password && (
            <p id={passwordErrorMessageID} aria-live='assertive'>
                {errors.password.message}
            </p>
        )}
        </div>

        <div className='form-control'>
            <label htmlFor={confirmPasswordID}>Confirm password</label>
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
            />

            Error: {errors.confirmPassword && (
            <p id={confirmPasswordErrorMessageID} aria-live='assertive'>
                {errors.confirmPassword.message}
            </p>
        )}
        </div>

        <div className='form-control'>
            <label>
                Remember Me
                <input
                    // name='rememberMe'
                    type='checkbox'
                    {...register('rememberMe')}
                />
            </label>
        </div>

        <button disabled={isSubmitting} type='submit'>Sign Up</button>
    </form>
};