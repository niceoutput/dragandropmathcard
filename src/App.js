import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        {/* math card */}
        <div className='math-card'>
          <Spot type='number'>1</Spot>
          <Spot type='number'>1</Spot>
          <Spot type='operator'>+</Spot>
          <div className='total'>2</div>
        </div>

        <div>
          <div className='cards numbers'>
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Number key={i} text={i} />
              ))}
          </div>

          <div className='cards operators'>
            {["*", "-", "+", "/"].map((o, i) => (
              <Operator key={i} text={o} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

function Spot({ type }) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: type,
    drop: (item) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let backgroundColor = "#f2f2f2";

  if (canDrop) backgroundColor = "#3db897";
  if (isOver) backgroundColor = "#4bdcb5";

  return (
    <div
      className='spot'
      ref={dropRef}
      style={{ backgroundColor: backgroundColor }}
    >
      0
    </div>
  );
}

function Number({ text }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "number", number: text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className='card' ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}

function Operator({ text }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "operator", operator: text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className='card' ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}
