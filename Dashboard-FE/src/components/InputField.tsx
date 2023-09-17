import React from 'react';

interface PropsElement {
  id: string;
  status: string;
  name: string;
  type: string;
  title: string;
  value: string;
  defaultValue: string;
  statusMessage: string;
  isRequired: boolean;
  placeHolder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField(props: PropsElement) {
  const inputClassName = `bg-${props.status}-50 border border-${props.status}-500 text-${props.status}-900 ${
    props.status === 'normal' ? 'text-gray-900' : 'dark:text-white'
  } placeholder-${props.status === 'normal' ? 'gray' : props.status}-700 text-sm rounded-lg focus:ring-${
    props.status === 'normal' ? 'blue' : props.status
  }-500 focus:border-${props.status} block w-full p-2.5 ${
    props.status === 'normal' ? 'dark:bg-gray-600 dark:border-gray-500 text-white' : 'dark:bg-gray-700 dark:border-red-500'
  }`;

  return (
    <>
      <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.title}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className={inputClassName}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.onChange}
        required={props.isRequired}
      />
      {props.status === 'error' && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {props.statusMessage}
        </p>
      )}
    </>
  );
}

export default function CustomInputField(props: PropsElement) {
  return <InputField {...props} />;
}
