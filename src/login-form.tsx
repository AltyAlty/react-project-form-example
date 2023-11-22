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
    email: string
    password: string
    confirmPassword: string
    termsOfUser: boolean
};

/*Форма для регистрации.*/
export const LoginForm = () => {
    const emailID = useId();
    const passwordID = useId();
    const confirmPasswordID = useId();
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
    return <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <div className='form-title-container'>
            <p className='form-title'>SIGN UP</p>
        </div>

        <div className='form-control'>
            <div>
                {/*Нужно связывать каждый элемент управления формой с элементом "label". Для этого нужно использовать
                атрибут "for" или "htmlFor" в элементе "label" и атрибут "id" в элементе управления формой с одинаковыми
                значениями.*/}
                <label htmlFor={emailID}>Email:</label>
            </div>

            <div>
                <input
                    className='email-input'
                    id={emailID}
                    // name='email'
                    type='email'
                    /*Для автозаполнения поля можно использовать атрибут "autoComplete" со значением, который будет
                    соответсвовать типу поля.*/
                    autoComplete='email'
                    /*В атрибует "aria-describedby" указываем значение атрибута "id" в сообщении об ошибке, чтобы
                    связать элемент управления формой и сообщение об ошибке в этой форме.*/
                    aria-describedby={emailErrorMessageID}
                    placeholder=' Email address...'
                    // required
                    /*Регистриуем поле формы при помощи хука "useForm()". Здесь также можно указать некоторые
                    атрибуты, такие как "name" и "required".*/
                    {...register('email', {required: 'The email field is required'})}
                />
            </div>

            <div>
                {errors.email && (
                    /*Используем атрибут "aria-live" со значением "assertive". Этот атрибут и атрибут "aria-describedby"
                    позволяют скринридерам зачитывать ошибки формы.*/
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
                    className='password-input'
                    id={passwordID}
                    // name='password'
                    type='password'
                    autoComplete='new-password'
                    aria-describedby={passwordErrorMessageID}
                    placeholder=' ****************'
                    // required
                    // minLength={8}
                    {...register('password', {
                        required: 'The password field is required',
                        minLength: {
                            value: 8,
                            message: 'Min length is 8 characters'
                        }
                    })}
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
                    className='confirm-password-input'
                    id={confirmPasswordID}
                    // name='confirm-password'
                    type='password'
                    /*Значение "new-password" атрибута "autoComplete" позволяет предложить пользователю сгенерировать
                    новый пароль.*/
                    autoComplete='new-password'
                    aria-describedby={confirmPasswordErrorMessageID}
                    placeholder=' ****************'
                    // required
                    // minLength={8}
                    {...register('confirmPassword', {
                        required: 'The confirm password field is required',
                        minLength: {
                            value: 8,
                            message: 'Min length is 8 characters'
                        }
                    })}
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

        <div className='form-control-terms-of-user'>
            {/*Также чтобы связать элемент управления формой с элементом "label", можно поместить этот элемент
            управления формой внутрь элемента "label".*/}
            <div>
                <label>
                    <input
                        className='terms-of-user-input'
                        // name='termsOfUser'
                        type='checkbox'
                        aria-describedby={termsOfUserErrorMessageID}
                        // required
                        {...register('termsOfUser', {required: 'The Terms of User field is required'})}
                    />
                    I agree to the Terms of User
                </label>
            </div>

            <div>
                {errors.termsOfUser && (
                    <p id={termsOfUserErrorMessageID} aria-live='assertive'
                       className='terms-of-user-error-message'>
                        Error: {errors.termsOfUser.message}
                    </p>
                )}
            </div>
        </div>

        <div className='buttons-container'>
            <div className='submit-button-container'>
                {/*У элемента "button" по умолчанию атрибут "type" имеет значение "submit, но лучше указывать это
                явно."*/}
                <button disabled={isSubmitting} type='submit' className='submit-button'>SIGN UP</button>
            </div>

            <div className='login-button-container'>
                <button className='login-button' type='button'>SIGN IN</button>
            </div>
        </div>
    </form>
};