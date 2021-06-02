import React, { useCallback, useEffect, useReducer } from 'react';

export const UPDATE_FORM = 'UPDATE_FORM';
export const ADD_FIELD = 'ADD_FIELD';
export const VALIDATE_FORM = 'VALIDATE_FORM';
export const RESET_FORM = 'RESET_FORM';
export const REMOVE_PRISTINE = 'REMOVE_PRISTINE';
export const START_SUBMITTING = 'START_SUBMITTING';
export const STOP_SUBMITTING = 'STOP_SUBMITTING';
export const UPDATE_SUBMIT_ERROR = 'UPDATE_SUBMIT_ERROR';
export const UPDATE_INITIAL_VALUES = 'UPDATE_INITIAL_VALUES';

/**
 * Validates a form field based on its validators and other related data.
 * @param {} key Key of the field to be validated.
 * @param {@type String} value value of the field to be validated.
 * @param {*} formValues all other data in the form if required.
 * @param {*} validators a list of all the validator functions.
 * @returns error in order of the validators provided.
 */
export const validateValue = (key, value, formValues, validators = []) => {
  if (validators.length > 0) {
    const errors = [];
    validators.forEach((validator) => {
      const error = validator(value, { ...formValues });
      if (error) {
        errors.push(error);
      }
    });
    if (errors.length > 0) {
      return errors[0];
    }
    return undefined;
  }
  return undefined;
};

/**
 * Creates a reducer function for form validation with given validations and default values.
 * @param {*} validators an object repersenting form fields with corresponding validators.
 * @param {*} initialValues an object repersenting form fields with corresponding default values.
 * @returns a reducer function.
 */
export const createFormReducer = (validators = {}, initialValues = {}) => {
  let formValues = {};
  Object.keys(initialValues).forEach((key) => {
    formValues = {
      ...formValues,
      [key]: { value: initialValues[key] ?? null },
    };
  });

  Object.keys(validators).forEach((key) => {
    const error = validateValue(
      key,
      formValues[key]?.value,
      { ...formValues },
      validators[key],
    );
    formValues = {
      ...formValues,
      [key]: { value: formValues[key]?.value, error },
    };
  });
  const initialState = {
    pristine: true,
    submitting: false,
    formValues: { ...formValues },
    hasError:
      Object.keys(formValues).filter((key) => !!formValues[key].error).length >
      0,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FIELD: {
        const {
          payload: { key, validators: newValidtor, defaultValue },
        } = action;

        validators[key] = newValidtor ?? [];
        const newFormValues = { ...state.formValues };
        const errorOfValue = validateValue(
          key,
          defaultValue,
          formValues,
          validators[key],
        );
        newFormValues[key] = {
          value: defaultValue ?? null,
          error: errorOfValue,
        };
        const newState = {
          ...state,
          formValues: newFormValues,
        };
        return newState;
      }
      case UPDATE_FORM: {
        if (!action?.payload) {
          return state;
        }
        const { key, value, error: customError } = action.payload;
        let newValue = value;

        if (value === '' || value === undefined) {
          newValue = null;
        }
        let error = validateValue(
          key,
          newValue,
          { ...state.formValues },
          validators?.[key],
        );
        if (customError) {
          error = customError;
        }
        const newFormValues = {
          ...state.formValues,
          [key]: { value: newValue, error },
        };
        const hasError =
          Object.keys(newFormValues).filter((k) => !!newFormValues[k].error)
            .length > 0;
        const newState = {
          ...state,
          formValues: { ...newFormValues },
          hasError,
          submitError: undefined,
        };
        return newState;
      }
      case VALIDATE_FORM: {
        let newFormValues = { ...state.formValues };
        Object.keys(validators).forEach((key) => {
          const value = state.formValues[key]?.value;
          const error = validateValue(
            key,
            value,
            { ...state.formValues },
            validators?.[key],
          );
          newFormValues = { ...newFormValues, [key]: { value, error } };
        });
        const hasError =
          Object.keys(newFormValues).filter((key) => !!newFormValues[key].error)
            .length > 0;
        const newState = {
          ...state,
          hasError,
        };
        return newState;
      }
      case UPDATE_SUBMIT_ERROR: {
        if (!action?.payload) {
          return state;
        }
        const { error: submitError } = action.payload;
        return { ...state, submitError };
      }
      case REMOVE_PRISTINE:
        return { ...state, pristine: false };
      case START_SUBMITTING:
        return { ...state, submitting: true };
      case STOP_SUBMITTING:
        return { ...state, submitting: false };
      case RESET_FORM:
        return initialState;
      default:
        return state;
    }
  };
  return { reducer, initialState };
};

/**
 *
 * @param {Object} validators An object containing field-name and validator.
 * @param {Object} initialValues An object containing field-name with its default values.
 * @param {*} onChange
 * @returns a custom hook with some properties.
 */
export const useFormReducer = (
  validators = {},
  initialValues = {},
  onChange,
) => {
  /**
   * Will create an reducer function and an object of initail values.
   */
  const { reducer, initialState } = createFormReducer(
    validators,
    initialValues,
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  // Action for validating form.
  const validateForm = useCallback(() => {
    dispatch({ type: VALIDATE_FORM });
  }, []);

  //Validate form when values in form values changes.
  useEffect(() => {
    validateForm();
  }, [state.formValues, validateForm]);

  // to change a particular field value.
  const change = useCallback((key, value) => {
    dispatch({ type: UPDATE_FORM, payload: { key, value } });
  }, []);

  // to change add new form field with key, validators and defaultValues.
  const addField = useCallback((key, validators, defaultValue) => {
    dispatch({ type: ADD_FIELD, payload: { key, validators, defaultValue } });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: RESET_FORM });
  }, []);

  const dirty = useCallback(() => {
    dispatch({ type: REMOVE_PRISTINE });
  }, []);

  // to indicate that form is submitting
  const startSubmitting = useCallback(() => {
    dispatch({ type: START_SUBMITTING });
  }, []);

  const stopSubmitting = useCallback(() => {
    dispatch({ type: STOP_SUBMITTING });
  }, []);

  const setSubmitError = useCallback((error) => {
    dispatch({
      type: UPDATE_SUBMIT_ERROR,
      payload: { key: 'submitError', error },
    });
  }, []);

  const handleSubmit = useCallback(
    (callback) => (event) => {
      event?.preventDefault();
      dirty();
      if (callback && !state.hasError && !state.submitting) {
        startSubmitting();
        const data = Object.keys(state.formValues).reduce(
          (acc, key) => ({ ...acc, [key]: state.formValues[key].value }),
          {},
        );
        setTimeout(async () => {
          await callback(data);
          stopSubmitting();
        }, 2000);
      }
    },
    [
      dirty,
      startSubmitting,
      state.formValues,
      state.hasError,
      state.submitting,
      stopSubmitting,
    ],
  );

  const handleChange = useCallback(
    (value) => {
      if (onChange) {
        const data = Object.keys(state.formValues).reduce(
          (acc, key) => ({ ...acc, [key]: state.formValues[key].value }),
          {},
        );
        onChange(value, {
          change,
          values: { ...data, ...value },
        });
      }
    },
    [change, onChange, state.formValues],
  );

  const shouldError = useCallback(
    (key) => {
      const res = !state.pristine && !!state.formValues?.[key]?.error;
      return res;
    },
    [state],
  );

  const connectField = useCallback(
    (name, extraProps = {}) =>
      (Field) =>
        (
          <Field
            name={name}
            key={name}
            value={state.formValues?.[name]?.value ?? ''}
            error={shouldError(name)}
            errorMessage={
              shouldError(name) ? state.formValues?.[name]?.error : undefined
            }
            onChange={(value) => {
              change(name, value);
            }}
            {...extraProps}
          />
        ),
    [change, shouldError, state.formValues],
  );

  return {
    ...state,
    change,
    reset,
    dirty,
    handleSubmit,
    setSubmitError,
    connectField,
    addField,
    handleChange,
  };
};
