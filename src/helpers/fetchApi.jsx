export const fetchApi = async (url) => {
  try {
    const response = await fetch(`https://api.github.com/${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
