/*Хук "useId()" это часть React, которая позволяет генерировать ID.*/
import {useId} from 'react';
/*Библиотека "react-hook-form" позволяет работать с формами в React. Берем из нее хук "useForm".*/
import {useForm} from 'react-hook-form';
import './SignUpForm.css';

/*Тип данных, который будет отправляться нашей формой.*/
type FormData = {
    username: string
    email: string
    password: string
    confirmPassword: string
    termsOfUser: boolean
    privacyPolicy: boolean
};

/*Форма для регистрации.*/
export const SignUpForm = () => {
    /*Генерируем ID для полей при помощи хука "useId()".*/
    const usernameID = useId();
    const emailID = useId();
    const passwordID = useId();
    const confirmPasswordID = useId();
    const usernameErrorMessageID = useId();
    const emailErrorMessageID = useId();
    const passwordErrorMessageID = useId();
    const confirmPasswordErrorMessageID = useId();
    const termsOfUserErrorMessageID = useId();
    const privacyPolicyErrorMessageID = useId();

    /*Используем хук "useForm()" из библиотеки "react-hook-form". Переменная "register" используется для регистрации
    полей формы, а переменная "handleSubmit" для указания перехватчика отправляемых формой данных. Чтобы не было
    возможности кликнуть много раз по кнопке отправки формы и много раз отправить данные формы, используем свойство
    "isSubmitting" в объекте "formState", чтобы знать когда происходит отправка данных формы с целью отключить кнопку
    отправки данных формы в такой момент. Для вывода ошибок используем свойство "errors" в объекте "formState".*/
    const {
        register,
        handleSubmit,
        formState: {isSubmitting, errors}
    } = useForm<FormData>();

    const onSendDataSubmit = (data: FormData) => console.log(data);

    /*Элемент "form" позволяет использовать встроенную браузерную валидацию. Если не нужно использовать такую валидацию,
    то можно использовать атрибут "noValidate".*/
    return <form
        className='login-form'
        onSubmit={handleSubmit(onSendDataSubmit)}
        method='post'
    >
        <div className='form-title-container'>
            <p className='form-title'>Sign Up</p>
        </div>

        <div className='form-title-description-container'>
            <p className='form-title-description'>Creating an account, you agree to our <a href=''>Terms of
                User</a> and acknowledge that you understand the <a href=''>Privacy Policy</a>.</p>
        </div>

        <div className='form-control'>
            <div className='username-title-container'>
                {/*Нужно связывать каждый элемент управления формой с элементом "label". Для этого нужно использовать
                атрибут "for" или "htmlFor" в элементе "label" и атрибут "id" в элементе управления формой с одинаковыми
                значениями. Элемент "label" делает поля формы доступными для скринридеров и увеличивает их площадь для
                клика.*/}
                <label
                    className='username-title'
                    htmlFor={usernameID}
                >Username</label>
            </div>

            <div className='username-input-container'>
                <input
                    className={errors.username ? 'username-input input-error' : 'username-input'}
                    id={usernameID}
                    type='text'
                    /*В атрибут "aria-describedby" указываем значение атрибута "id" в сообщении об ошибке, чтобы
                    связать элемент управления формой и сообщение об ошибке в этой форме.*/
                    aria-describedby={usernameErrorMessageID}
                    placeholder=' Enter your username...'
                    /*Регистрируем поле формы при помощи хука "useForm()". Здесь также можно указать некоторые
                    атрибуты, такие как "name" (идет первым), "required" или "minLength".*/
                    /*При помощи атрибута "pattern" устанавливаем ограничение на вводимые символы.*/
                    // pattern={'[A-Za-z0-9\\-_\\.]{4,20}'}
                    {...register('username', {
                        required: 'The username field is required',
                        minLength: {value: 4, message: 'Minimum length is 4 characters'},
                        maxLength: {value: 20, message: 'Maximum length is 20 characters'},

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
                    /*Используем атрибут "aria-live" со значением "assertive". Этот атрибут и атрибут "aria-describedby"
                    позволяют скринридерам зачитывать ошибки формы.*/
                    <p
                        id={usernameErrorMessageID}
                        aria-live='assertive'
                        className='username-error-message'
                    >
                        <strong>Error:</strong> {errors.username.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div className='email-title-container'>
                <label
                    className='email-title'
                    htmlFor={emailID}
                >Email</label>
            </div>

            <div className='email-input-container'>
                <input
                    className={errors.email ? 'email-input input-error' : 'email-input'}
                    id={emailID}
                    /*Важно задать правильное значение атрибута "type". Например, значение "email" сделает так, что
                    браузер будет предлагать почты для автозаполнения, на мобильных устройствах будет отображаться
                    удобная клавиатура для ввода почты, а также будет работать встроенная браузерная валидация.*/
                    type='email'
                    /*Для автозаполнения поля можно использовать атрибут "autoComplete" со значением, который будет
                    соответствовать типу поля.*/
                    autoComplete='email'
                    aria-describedby={emailErrorMessageID}
                    placeholder=' Enter your email address...'
                    {...register('email', {required: 'The email field is required'})}
                />
            </div>

            <div className='email-error-message-container'>
                {errors.email && (
                    <p
                        id={emailErrorMessageID}
                        aria-live='assertive'
                        className='email-error-message'
                    >
                        <strong>Error:</strong> {errors.email.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div className='password-title-container'>
                <label
                    className='password-title'
                    htmlFor={passwordID}
                >Password</label>
            </div>

            <div className='password-input-container'>
                <input
                    className={errors.password ? 'password-input input-error' : 'password-input'}
                    id={passwordID}
                    type='password'
                    /*Значение "new-password" атрибута "autoComplete" позволяет предложить пользователю сгенерировать
                    новый пароль.*/
                    autoComplete='new-password'
                    aria-describedby={passwordErrorMessageID}
                    placeholder=' Enter your password...'
                    {...register('password', {
                        required: 'The password field is required',
                        minLength: {value: 8, message: 'Minimum length is 8 characters'}
                    })}
                />
            </div>

            <div className='password-error-message-container'>
                {errors.password && (
                    <p
                        id={passwordErrorMessageID}
                        aria-live='assertive'
                        className='password-error-message'
                    >
                        <strong>Error:</strong> {errors.password.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control'>
            <div className='confirm-password-title-container'>
                <label
                    className='confirm-password-title'
                    htmlFor={confirmPasswordID}
                >Confirm password</label>
            </div>

            <div className='confirm-password-input-container'>
                <input
                    className={errors.confirmPassword ? 'confirm-password-input input-error' : 'confirm-password-input'}
                    id={confirmPasswordID}
                    type='password'
                    autoComplete='new-password'
                    aria-describedby={confirmPasswordErrorMessageID}
                    placeholder=' Confirm your password...'
                    {...register('confirmPassword', {
                        required: 'The confirm password field is required',
                        minLength: {value: 8, message: 'Minimum length is 8 characters'}
                    })}
                />
            </div>

            <div className='confirm-password-error-message-container'>
                {errors.confirmPassword && (
                    <p
                        id={confirmPasswordErrorMessageID}
                        aria-live='assertive'
                        className='confirm-password-error-message'
                    >
                        <strong>Error:</strong> {errors.confirmPassword.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control-terms-of-user'>
            {/*Также, чтобы связать элемент управления формой с элементом "label", можно поместить этот элемент
            управления формой внутрь элемента "label".*/}
            <div className='terms-of-user-title-and-input-container'>
                <label className='terms-of-user-title'>
                    <input
                        className={errors.termsOfUser ? 'terms-of-user-input input-error' : 'terms-of-user-input'}
                        type='checkbox'
                        aria-describedby={termsOfUserErrorMessageID}
                        {...register('termsOfUser', {required: 'The Terms of User field is required'})}
                    />

                    <span>I agree to the Terms of User</span>
                </label>
            </div>

            <div className='terms-of-user-error-message-container'>
                {errors.termsOfUser && (
                    <p
                        id={termsOfUserErrorMessageID}
                        aria-live='assertive'
                        className='terms-of-user-error-message'
                    >
                        <strong>Error:</strong> {errors.termsOfUser.message}
                    </p>
                )}
            </div>
        </div>

        <div className='form-control-privacy-policy'>
            <div className='privacy-policy-title-and-input-container'>
                <label className='privacy-policy-title'>
                    <input
                        className={errors.privacyPolicy ? 'privacy-policy-input input-error' : 'privacy-policy-input'}
                        type='checkbox'
                        aria-describedby={privacyPolicyErrorMessageID}
                        {...register('privacyPolicy', {required: 'The Privacy Policy field is required'})}
                    />

                    <span>I read the Privacy Policy</span>
                </label>
            </div>

            <div className='privacy-policy-error-message-container'>
                {errors.privacyPolicy && (
                    <p
                        id={privacyPolicyErrorMessageID}
                        aria-live='assertive'
                        className='privacy-policy-error-message'
                    >
                        <strong>Error:</strong> {errors.privacyPolicy.message}
                    </p>
                )}
            </div>
        </div>

        <div className='buttons-container'>
            <div className='submit-button-container'>
                {/*У элемента "button" по умолчанию атрибут "type" имеет значение "submit, но лучше указывать это
                явно, так как иначе другие кнопки тоже будут заниматься отправкой данных формы."*/}
                <button className='submit-button' type='submit' disabled={isSubmitting}>SIGN UP</button>
            </div>

            <div className='login-button-container'>
                <button className='login-button' type='button'>SIGN IN</button>
            </div>
        </div>
    </form>
};