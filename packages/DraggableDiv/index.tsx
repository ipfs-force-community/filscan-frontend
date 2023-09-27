
import React, { useState, useRef } from "react";
import style from './index.module.scss'
import classNames from "classnames";

interface Props {
              children: React.ReactElement | JSX.Element
              className?:string
}

const DraggableDiv = (props: Props) => {
  const {children,className } = props;
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setStartX(e.clientX - (divRef.current?.offsetLeft || 0));
    setStartY(e.clientY - (divRef.current?.offsetTop || 0));
    setScrollLeft(divRef.current?.scrollLeft || 0);
    setScrollTop(divRef.current?.scrollTop || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.clientX - (divRef.current?.offsetLeft || 0);
    const y = e.clientY - (divRef.current?.offsetTop || 0);
    const walkX = (x - startX);
    const walkY = (y - startY);
    if(divRef.current) {
      divRef.current.scrollLeft = scrollLeft - walkX;
      divRef.current.scrollTop = scrollTop - walkY;
    }
  };

  return (
    <div
      ref={divRef}
      className={ `${style.draggable} ${className}`}
      //       onTouchStart={handleTouchStart}
      //       onTouchEnd={handleTouchEnd}
      //       onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

export default DraggableDiv;
