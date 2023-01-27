export const getJSON = async function (url) {
  try {
    const api = await fetch(url);

    const data = await api.json();

    if (!api.ok) throw new Error(`${data.message(`${api.status}`)}`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const findINDEX = function (array, condition) {
  const findIndex = array.findIndex(condition);

  return findIndex;
};
