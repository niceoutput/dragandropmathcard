import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import "./App.css";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        {/* math card */}
        <div className='math-card'>
          <div className='spot'>1</div>
          <div className='spot'>1</div>
          <div className='spot'>+</div>
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
