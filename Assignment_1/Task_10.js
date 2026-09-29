function fetchWithTimeout(url, ms) {
  let timerId;
  const timeout = new Promise((_, reject) => {
    timerId = setTimeout(() => reject(new Error("Request Timed Out")), ms);
  });
  return Promise.race([fetch(url), timeout]).finally(() => clearTimeout(timerId));
}

fetchWithTimeout("https://google.com", 1)
  .then((res) => console.log("Status:", res.status))
  .catch((err) => console.log(err.message));