function Header(props) {

  return (
    <header>
      <h1>My React App</h1>
      <h2>Welcome, {props.name}!</h2>
    </header>
  );
}

export default Header;
