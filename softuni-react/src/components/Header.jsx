function Header(props) {
  let display;

  if (props.name) {
    display = props.name;
  } else {
    display = "Guest";
  }

  return (
    <header>
      <h1>My React App</h1>
      <h2>Welcome, {display}!</h2>
    </header>
  );
}

export default Header;
