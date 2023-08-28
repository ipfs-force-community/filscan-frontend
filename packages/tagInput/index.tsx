/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { Input, InputRef } from 'antd';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';

interface EditableTextProps {
  text: string;
  record: any; // 你可以替换为你需要的类型
  isEdit?: boolean;
  onChange?: (value: any) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  text,
  record,
  onChange,
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

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value);
    //发起请求，修改标签
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange) {
      onChange(currentText);
    }
    //save current
  };

  return isEditing && isEdit ? (
    <Input
      ref={inputRef}
      value={currentText}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onPressEnter={handleBlur}
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
