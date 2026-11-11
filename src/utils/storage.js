export function readStorage(key, fallback) {
  try {
    const storedData = localStorage.getItem(key);

    return storedData
      ? JSON.parse(storedData)
      : fallback;
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key}:`, error);
  }
}