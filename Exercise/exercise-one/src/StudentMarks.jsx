function StudentMarks() {
  const studentNameArr = ["Ramesh", "Sujata", "Jivan", "Latif", "Ajay"];
  const studentMarksArr = ["450", "488", "350", "570", "510"];
  //Initialize an empty object to store the key-value pairs
  const studentMarksPair = {};
  // Iterate over one of the arrays (assuming they have the same length)
  for (let i = 0; i < studentNameArr.length; i++) {
    // This line gets the current key from the keys array at index i.
    const studentName = studentNameArr[i];
    // This line gets the corresponding value from the values array at the same index i
    const sudentMarks = studentMarksArr[i];
    // This line below assigns the value from the values array to the object 'studentMarksPair'. using the current key from the keys array.
    studentMarksPair[studentName] = sudentMarks;
    // console.log(studentMarksPair);
  }
  return (
    <div>
      {/*method that takes an object (studentMarksPair in this case) and returns an array of the object's key-value pairs. Each key-value pair is returned as a two-element array [key, value]. */}
      {Object.entries(studentMarksPair).map(([key, value]) => (
        // .map() is a JavaScript array method that creates a new array by applying a function to each element of the array. In this case, map is used to iterate over each key-value pair from the Object.entries() result.
        // The callback function takes two parameters, key and value (using destructuring [key, value] to extract them from the array).
        // For each iteration, it returns a React element, specifically a <p> tag, with the key as the key attribute (required by React for list elements) and the key-value pair rendered inside the tag.
        <p key={key}>
          {/* Each <p> element is assigned a unique key attribute. React uses key attributes to efficiently track elements in lists and optimize rendering. In this case, the key is the object property name (the key from the key-value pair). */}
          {key}:{value}
          {/* This means for each key-value pair, it renders a paragraph like name: Alice */}
        </p>
      ))}
    </div>
  );
}
export default StudentMarks;
