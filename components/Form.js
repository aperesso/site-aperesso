import React , { useCallback , memo , useState } from 'react';
import emailValidator from 'email-validator';
import MUInput from '@material-ui/core/Input';
import MUITextField from '@material-ui/core/TextField';

import '../scss/form.scss';

const Field = memo(
    ({label, value, error, onChange, isTextArea, disabled}) => {

        const onChangeField = useCallback(({target : { value }}) => onChange(label, {value}), [onChange])
        if (isTextArea) {
            return (
                <MUITextField
                    className="contact-input"
                    value={value}
                    placeholder={label}
                    error={error ? true : false}
                    onChange={onChangeField}
                    multiline
                    rows={8}
                    disabled={disabled}
              />
            )
        }
        return (
            <MUInput 
                className="contact-input"
                value={value}
                placeholder={label}
                error={error ? true : false }
                onChange={onChangeField}
                disabled={disabled}
            />
        )
    }
)


const Form = ({onSubmit : submit}) => {

    const [form, setForm] = useState({
        name : {
            value : '',
            error: ''
        },
        email : {
            value : '',
            error: ''
        },
        message : {
            value : '',
            error : ''
        }
    })

    const [isSubmitted, setIsSubmittedForm] = useState(false)

    const [displayError, setDisplayedError ] = useState(false)


    const onChangeField = useCallback(
        (field, obj) => {
            if (!field) return ;

            setForm(
                form => {
                    const { value , error : err } = obj;
                    const error = displayError ? getError({field, value}) : err ;
                    return {
                        ...form,
                        [ field ] : {
                            value,
                            error
                        }
                    }
                }
            )
            
        } , [setForm, displayError]
    )

     
    const getError = useCallback(({field, value}) => {
        if (value.trim() === '') return 'empty';
        if (field === "email" && !emailValidator.validate(value.trim())) return 'invalidEmail';
        return ''
    }, [])

    const verifyForm = useCallback(
        async () => {
            let hasError = 0 ;
            await setForm(
                form => {
                    const verifiedForm = Object.keys(form)
                        .reduce((obj, field) => {

                            const { [ field ] :  { value } } = form;
                            const error = getError({field, value});
                            if (error) hasError++ ;
                            return {
                                ...obj,
                                [field] : {
                                    error,
                                    value
                                }
                            }
                        }, {}
                    )
                    return verifiedForm
                }
            )

            return hasError;
        } , [setForm]
    )

   
    const onSubmit = useCallback(
        async () => {
            if (isSubmitted) return ;

            const hasError = await verifyForm();

            setDisplayedError(true);
            if (hasError !== 0) return ;
            
            fetch(
                '/api/contact' , {
                    method : 'POST',
                    body : JSON.stringify({
                        name : form.name.value,
                        email : form.email.value,
                        message : form.message.value
                    })
                }
            )

            submit()
            setIsSubmittedForm(true)
        }
        , [verifyForm, form, setDisplayedError, submit, setIsSubmittedForm, isSubmitted],
    )
    
    return (
        <div className="form">
            {
                Object.keys(form)
                    .map(
                        key => (
                            <Field 
                                key={key}
                                label={key}
                                value={form[key].value}
                                error={form[key].error}
                                onChange={onChangeField}
                                isTextArea={key === 'message'}
                                disabled={isSubmitted}
                            />
                        )
                    )
            }

            <button className="no-btn cta" onClick={onSubmit}>
                {isSubmitted ? 'Thank you ♡' : 'Send a message' }
            </button>
        </div>
    )
}

export default memo(Form);