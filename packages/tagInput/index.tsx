/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { Input, InputRef } from 'antd';

interface EditableTextProps {
  text: string;
  record: any; // 你可以替换为你需要的类型
  isEdit?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  text,
  record,
  isEdit = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    //save current
  };

  return isEditing && isEdit ? (
    <Input
      ref={inputRef}
      value={currentText}
      onChange={handleInputChange}
      onBlur={handleBlur}
      className='rounded-md w-4/5' // tailwindcss样式
    />
  ) : (
    <span
      onClick={handleTextClick}
      className='cursor-pointer des_bg_color p-2 rounded-[5px] text-primary'>
      {currentText || '--'}
    </span>
  );
};

export default EditableText;
