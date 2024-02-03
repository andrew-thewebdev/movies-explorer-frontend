import { useState, useEffect } from 'react';

function isDefined(storedValue) {
  return storedValue !== null && storedValue !== 'undefined';
}

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return isDefined(storedValue) ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validateName = (name) => {
    return String(name)
      .toLowerCase()
      .match(/^[a-zа-яё\s-]+$/iu);
  };

  const validatePassword = (password) => {
    return password !== '';
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let validationError = '';

    if (name === 'name') {
      if (!validateName(value)) {
        validationError =
          'Введите пожалуйста имя из символов кириллицы, латиницы, пробелов и тире';
      }
      if (target.validationMessage) {
        validationError = target.validationMessage;
      }
    }
    if (name === 'email') {
      if (!validateEmail(value)) {
        validationError = 'Введите пожалуйста адрес эл. почты';
      }
    }
    if (name === 'password') {
      if (!validatePassword(value)) {
        validationError = 'Введите пожалуйста пароль';
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationError });
    setIsValid(target.closest('form').checkValidity());
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
  };
}
