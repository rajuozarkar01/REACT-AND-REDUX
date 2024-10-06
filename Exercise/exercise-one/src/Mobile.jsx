function Mobile() {
  const brandName = [
    "Apple",
    "Sasmsung",
    "Xiomi",
    "Oppo",
    "Realme",
    "Vivo",
    "Iqoo",
  ];
  const brandPrice = [79000, 125000, 48000, 35000, 29000, 30000, 19000];
  //Initialize an empty object to store the key-value pairs
  const modelPrice = {};
  // Iterate over one of the arrays (assuming they have the same length)
  for (let i = 0; i < brandName.length; i++) {
    // This line gets the current key from the keys array at index i.
    const brand = brandName[i];
    // This line gets the corresponding value from the values array at the same index i
    const price = brandPrice[i];
    // This line below assigns the value from the values array to the object 'balanceInAccount'. using the current key from the keys array.
    modelPrice[brand] = price;
    // console.log({modelPrice});

  
  }
  return (
    <>
      {/*method that takes an object (modelPrice in this case) and returns an array of the object's key-value pairs. Each key-value pair is returned as a two-element array [key, value]. */}
      {Object.entries(modelPrice).map(([key, value]) => (
        // .map() is a JavaScript array method that creates a new array by applying a function to each element of the array. In this case, map is used to iterate over each key-value pair from the Object.entries() result.
        // The callback function takes two parameters, key and value (using destructuring [key, value] to extract them from the array).
        // For each iteration, it returns a React element, specifically a <p> tag, with the key as the key attribute (required by React for list elements) and the key-value pair rendered inside the tag.
        <p key={key}>
          {/* Each <p> element is assigned a unique key attribute. React uses key attributes to efficiently track elements in lists and optimize rendering. In this case, the key is the object property name (the key from the key-value pair). */}
          {key}:{value}
          {/* This means for each key-value pair, it renders a paragraph like name: Alice */}
        </p>
      ))}
    </>
  );
}
export default Mobile;
