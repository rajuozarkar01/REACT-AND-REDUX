function Hello () {

  let myName = 'Raju';
  let number = 456;
  let fullName = () => {
    return 'Raju Ozarkar';
  }
  return <p>
    MessageNo: {number} I am your master {fullName()}.
    </p>
}

export default Hello;
