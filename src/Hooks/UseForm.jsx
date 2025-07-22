import { useState, useCallback } from "react";

export default function UseForm(initialValues, Validate) {
  const [Values, setValues] = useState(initialValues);
  const [Errors, setErrors] = useState({});
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
      setErrors((errs) => ({ ...errs, [name]: Validate(name, value) }));
    },
    [Validate]
  );
  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);
  return { Values, Errors, handleChange, handleReset };
}
