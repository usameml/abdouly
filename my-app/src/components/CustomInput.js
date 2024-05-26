import React from 'react';

const CustomInput = ({ type, name, onChng, onBlr, val, label, id }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChng}
        onBlur={onBlr}
        value={val}
        id={id}
        className="form-control"
      />
    </div>
  );
};

export default CustomInput;
