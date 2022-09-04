function RemoveTags(props) {
  const string = props.children;
  return string.replace(/<\/?[^>]+(>|$)/g, "");
}

export default RemoveTags;
