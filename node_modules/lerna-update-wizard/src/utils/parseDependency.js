module.exports = signature => {
  const firstIndex = signature.indexOf("@");
  const lastIndex = signature.lastIndexOf("@");

  let name;
  let version;
  if (firstIndex !== lastIndex) {
    name = signature.substring(0, lastIndex);
    version = signature.substring(lastIndex + 1);  
  } else if (firstIndex > 0) {
    [name, version] = signature.split("@");
  } else {
    name = signature;
  }

  return { name, version };
};
