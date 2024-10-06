function Random(){
  let num = Math.random() * 100;
  return <h3 
  style={{'backgroundColor': '#775984'}}>Random number is :{Math.round(num)}
  </h3>
}
export default Random