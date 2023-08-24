/** @format */

import React from 'react';

const arr = [
  [1, 2, 4],
  [5, 6, 7],
];

export default function Drag() {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target;
    dropzone.appendChild(draggableElement);
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      {arr.map((vItem, i) => {
        return (
          <ul
            key={i}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className='border border_color'>
            {vItem.map((item, j) => {
              return (
                <li
                  key={j}
                  id={`item-${i}-${j}`}
                  draggable
                  onDragStart={handleDragStart}>
                  {item}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
