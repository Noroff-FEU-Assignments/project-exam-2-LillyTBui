function RemoveSpecialCharacters(props) {
  const string = props.children;
  return string.replace("&#8217;", "'");
}

export default RemoveSpecialCharacters;
