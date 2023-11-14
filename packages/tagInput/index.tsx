/** @format */

import React, { useState, useEffect, useRef } from 'react'
import { Input, InputRef } from 'antd'
import TextTooltip from '../textTooltip'

interface EditableTextProps {
  text: string
  record: any // 你可以替换为你需要的类型
  isEdit?: boolean
  onChange?: (value: any) => void
}

const EditableText: React.FC<EditableTextProps> = ({
  text,
  record,
  onChange,
  isEdit = true,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [currentText, setCurrentText] = useState(text)
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    setCurrentText(text)
  }, [text])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleTextClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value)
    //发起请求，修改标签
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (onChange) {
      onChange(currentText)
    }
    //save current
  }

  return isEditing && isEdit ? (
    <Input
      ref={inputRef}
      value={currentText}
      onChange={handleInputChange}
      onBlur={handleBlur}
      showCount={true}
      maxLength={20}
      onPressEnter={handleBlur}
      className="custom_input !w-4/5  !rounded-md" // tailwindcss样式
    />
  ) : (
    <div
      onClick={handleTextClick}
      className="des_bg_color flex h-8 w-fit max-w-[200px] cursor-default items-center overflow-hidden text-ellipsis rounded-[5px] p-2 text-xs"
    >
      <TextTooltip className="cursor-default" text={currentText || '--'} />
    </div>
  )
}

export default EditableText
