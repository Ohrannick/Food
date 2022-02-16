const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  return await res.json();
};

const getZero = (num) => {
  return num >= 0 && num < 10 ? `0${num}` : num < 0 ? '00' : num;
};

export { postData, getZero };
