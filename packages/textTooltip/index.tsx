/** @format */

import React, { useRef, useState, useEffect } from 'react';
import { Tooltip } from 'antd';

interface Props {
  text: string;
}

const EllipsisText: React.FC<Props> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        setIsOverflowing(
          element.offsetWidth <
            element.scrollWidth + paddingLeft + paddingRight ||
            element.offsetHeight < element.scrollHeight
        );
      }
    };
    window.addEventListener('resize', checkOverflow);
    checkOverflow();
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <Tooltip title={isOverflowing ? text : ''}>
      <div
        ref={textRef}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        }}>
        {text}
      </div>
    </Tooltip>
  );
};

export default EllipsisText;