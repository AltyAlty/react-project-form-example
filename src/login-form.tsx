/*
Атрибут "htmlFor" в React является аналогом атрибута "for".
"useId" это часть React, которая позволяет генерировать ID.
*/
import {useId} from 'react';
/*Библиотека "react-hook-form" позволяет работать с формами в React.*/
import {useForm} from 'react-hook-form';
import './login-form.css';

/*Тип данных, который будут отправляться нашей формой.*/
type FormData = {
    username: string
    email: string
    password: string
    confirmPassword: string
    termsOfUser: boolean
};

/*Форма для регистрации.*/
export const LoginForm = () => {
    const usernameID = useId();
    const emailID = useId();
    const passwordID = useId();
    const confirmPasswordID = useId();
    const usernameErrorMessageID = useId();
    const emailErrorMessageID = useId();
    const passwordErrorMessageID = useId();
    const confirmPasswordErrorMessageID = useId();
    const termsOfUserErrorMessageID = useId();

    /*Используем хук "useForm()" из библиотеки "react-hook-form". "register" используется для регистрации полей формы, а
    "handleSubmit" для указания перехватчика данных, которые будут отправляться формой. Чтобы не было возможности
    кликнуть много раз по кнопке отправки формы и много раз отправить данные формы, используем "isSubmitting", чтобы
    знать когда происходит отправка данных формы с целью отключить кнопку отправки данных формы в такой момент. Для
    вывода ошибок используем "errors".*/
    const {
        register,
        handleSubmit,
        formState: {isSubmitting, errors}
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => console.log(data);

    /*Элемент "form" позволяет использовать встроенную валидацию. Если не нужно использовать такую валидацию, то можно
    использовать атрибут "noValidate".*/
    return <form className='login-form' onSubmit={handleSubmit(onSubmit)} method='post'>
        <div className='form-title-container'>
            <p className='form-title'>SIGN UP</p>
        </div>

        <div className='form-control'>
            <div className='username-title-container'>
                <label className='username-title' htmlFor={usernameID}>Username:</label>
            </div>

            <div className='username-input-container'>
                <input
                    // className='username-input'
                    className={errors.username ? 'username-input input-error' : 'username-input'}
                    id={usernameID}
                    // name='username'
                    type='text'
                    aria-describedby={usernameErrorMessageID}
                    placeholder=' Enter username...'
                    // required
                    /*При помощи атрибута "pattern" устанавливаем ограничение на вводимые символы.*/
                    // pattern={'[A-Za-z0-9\\-_\\.]{4,20}'}
                    {...register('username', {
                        required: 'The username field is required',
                        minLength: {
                            value: 4,
                            message: 'Minimum length is 4 characters'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Maximum length is 20 characters'
                        },
                        pattern: {
                            /*
                            (?=.{4,20}$) username is 8-20 characters long
                            (?![_.]) no _ or . at the beginning
                            (?!.*[_.]{2}) no __ or _. or ._ or .. inside
                            [a-zA-Z0-9._] allowed characters
                            +(?<![_.])$ no _ or . at the end
                            */
                            value: /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i,
                            message: 'Invalid username'
                        }
                    })}
                />
            </div>

            <div className='username-error-message-container'>
                {errors.username && (
                    <p id={usernameErrorMessageID} aria-live='assertive' className='username-error-message'>
                            <strong>Error:</strong> {errors.username.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div className='email-title-container'>
                {/*Нужно связывать каждый элемент управления формой с элементом "label". Для этого нужно использовать
                атрибут "for" или "htmlFor" в элементе "label" и атрибут "id" в элементе управления формой с одинаковыми
                значениями.*/}
                <label className='email-title' htmlFor={emailID}>Email:</label>
            </div>

            <div className='email-input-container'>
                <input
                    // className='email-input'
                    className={errors.email ? 'email-input input-error' : 'email-input'}
                    id={emailID}
                    // name='email'
                    type='email'
                    /*Для автозаполнения поля можно использовать атрибут "autoComplete" со значением, который будет
                    соответсвовать типу поля.*/
                    autoComplete='email'
                    /*В атрибует "aria-describedby" указываем значение атрибута "id" в сообщении об ошибке, чтобы
                    связать элемент управления формой и сообщение об ошибке в этой форме.*/
                    aria-describedby={emailErrorMessageID}
                    placeholder=' Enter email address...'
                    // required
                    /*Регистриуем поле формы при помощи хука "useForm()". Здесь также можно указать некоторые
                    атрибуты, такие как "name" и "required".*/
                    {...register('email', {required: 'The email field is required'})}
                />
            </div>

            <div className='email-error-message-container'>
                {errors.email && (
                    /*Используем атрибут "aria-live" со значением "assertive". Этот атрибут и атрибут "aria-describedby"
                    позволяют скринридерам зачитывать ошибки формы.*/
                    <p id={emailErrorMessageID} aria-live='assertive' className='email-error-message'>
                        <strong>Error:</strong> {errors.email.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div className='password-title-container'>
                <label className='password-title' htmlFor={passwordID}>Password:</label>
            </div>

            <div className='password-input-container'>
                <input
                    // className='password-input'
                    className={errors.password ? 'password-input input-error' : 'password-input'}
                    id={passwordID}
                    // name='password'
                    type='password'
                    autoComplete='new-password'
                    aria-describedby={passwordErrorMessageID}
                    placeholder=' Enter password...'
                    // required
                    // minLength={8}
                    {...register('password', {
                        required: 'The password field is required',
                        minLength: {
                            value: 8,
                            message: 'Minimum length is 8 characters'
                        }
                    })}
                />
            </div>

            <div className='password-error-message-container'>
                {errors.password && (
                    <p id={passwordErrorMessageID} aria-live='assertive' className='password-error-message'>
                        <strong>Error:</strong> {errors.password.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div className='confirm-password-title-container'>
                <label className='confirm-password-title' htmlFor={confirmPasswordID}>Confirm password:</label>
            </div>

            <div className='confirm-password-input-container'>
                <input
                    // className='confirm-password-input'
                    className={errors.confirmPassword ? 'confirm-password-input input-error' : 'confirm-password-input'}
                    id={confirmPasswordID}
                    // name='confirm-password'
                    type='password'
                    /*Значение "new-password" атрибута "autoComplete" позволяет предложить пользователю сгенерировать
                    новый пароль.*/
                    autoComplete='new-password'
                    aria-describedby={confirmPasswordErrorMessageID}
                    placeholder=' Confirm password...'
                    // required
                    // minLength={8}
                    {...register('confirmPassword', {
                        required: 'The confirm password field is required',
                        minLength: {
                            value: 8,
                            message: 'Minimum length is 8 characters'
                        }
                    })}
                />
            </div>

            <div className='confirm-password-error-message-container'>
                {errors.confirmPassword && (
                    <p id={confirmPasswordErrorMessageID} aria-live='assertive'
                       className='confirm-password-error-message'>
                        <strong>Error:</strong> {errors.confirmPassword.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control-terms-of-user'>
            {/*Также чтобы связать элемент управления формой с элементом "label", можно поместить этот элемент
            управления формой внутрь элемента "label".*/}
            <div className='terms-of-user-title-and-input-container'>
                <label className='terms-of-user-title'>
                    <input
                        // className='terms-of-user-input'
                        className={errors.termsOfUser ? 'terms-of-user-input input-error' : 'terms-of-user-input'}
                        // name='termsOfUser'
                        type='checkbox'
                        aria-describedby={termsOfUserErrorMessageID}
                        // required
                        {...register('termsOfUser', {required: 'The Terms of User field is required'})}
                    />
                    <span>I agree to the Terms of User</span>
                </label>
            </div>

            <div className='terms-of-user-error-message-container'>
                {errors.termsOfUser && (
                    <p id={termsOfUserErrorMessageID} aria-live='assertive'
                       className='terms-of-user-error-message'>
                        <strong>Error:</strong> {errors.termsOfUser.message}
                    </p>
                )}
            </div>
        </div>

        <div className='buttons-container'>
            <div className='submit-button-container'>
                {/*У элемента "button" по умолчанию атрибут "type" имеет значение "submit, но лучше указывать это
                явно."*/}
                <button className='submit-button' type='submit' disabled={isSubmitting}>SIGN UP</button>
            </div>

            <div className='login-button-container'>
                <button className='login-button' type='button'>SIGN IN</button>
            </div>
        </div>
    </form>
};