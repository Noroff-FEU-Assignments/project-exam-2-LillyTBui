/**
 * Removes html tags in string
 * @param {*} props
 * @returns string without html tags
 */

function RemoveTags(props) {
  const string = props.children;
  return string.replace(/<\/?[^>]+(>|$)/g, "");
}

export default RemoveTags;
