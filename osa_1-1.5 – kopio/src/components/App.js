import React from "react";
import Course from "./Course";

const App = () => {
  const course = [
    {
      name: "Half Stack -sovelluskehitys",
      id: 1,
      parts: [
        {
          name: "Reactin perusteet",
          exercises: 10,
          id: 1
        },
        {
          name: "Tiedonvälitys propseilla",
          exercises: 7,
          id: 2
        },
        {
          name: "Komponenttien tila",
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewaret",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      {course.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
