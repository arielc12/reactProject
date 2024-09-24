import React, { useCallback, useState } from "react";
import Joi from "joi";

export default function useForm(initialForm, schema, handleSubmit) {
  const [data, setData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateProperty = useCallback(
    (name, value) => {
      let joiSchema = Joi.object({ [name]: schema[name] });
      let { error } = joiSchema.validate({ [name]: value });
      return error ? error.details[0].message : null;
    },
    [schema]
  );

  const validateForm = useCallback(() => {
    const joiSchema = Joi.object(schema);
    const { error } = joiSchema.validate(data, { abortEarly: false });
    if (!error) {
      setIsFormValid(true);
      setErrors({});
      return true;
    } else {
      setIsFormValid(false);
      const newErrors = {};
      error.details.forEach(({ path, message }) => {
        newErrors[path[0]] = message;
      });
      setErrors(newErrors);
      return false;
    }
  }, [schema, data]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => {
        const newData = { ...prev, [name]: value };
        validateForm(newData);
        return newData;
      });
      const errorMessage = validateProperty(name, value);
      setErrors((prev) => (errorMessage ? { ...prev, [name]: errorMessage } : { ...prev, [name]: undefined }));
    },
    [validateProperty, validateForm]
  );

  const handleChangeCheckBox = useCallback((e) => {
    let value = e.target.checked;
    let name = e.target.name;
    setData((prev) => {
      const newData = { ...prev, [name]: value };
      validateForm(newData);
      return newData;
    });
  }, [validateForm]);


  const handleReset = useCallback(() => {
    setData(initialForm);
    setErrors({});
    setIsFormValid(false);
  }, [initialForm]);

  const onSubmit = useCallback(() => {
    handleSubmit(data);
  }, [data]);

  React.useEffect(() => {
    validateForm();
  }, [data, validateForm]);

  return {
    data,
    errors,
    setData,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
    isFormValid,
    setIsFormValid,
  };
}