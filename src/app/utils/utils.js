// Get a specific cookie by name
export function getCookie(name) {
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1); // Return cookie value
    }
  }
  return null; // Return null if cookie is not found
}

// Custom console log with styling
export function consoleLog(data, type = "default") {
  // Set default type as 'default'
  const styles = {
    1: "color: blue; font-size: 16px; font-weight: bold;", // Blue text
    2: "color: green; font-size: 14px; font-style: italic;", // Green text for success
    3: "color: red; font-size: 14px; font-weight: bold; background: lightyellow;", // Red text for errors
    4: "color: gray; font-size: 12px; text-decoration: underline;", // Gray text for warnings
    default: "color: black; font-size: 14px;", // Default style
  };

  console.log(`%c ${data}`, styles[type]); // Apply style based on type
}
