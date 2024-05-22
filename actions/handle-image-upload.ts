const prefix =
  "https://a02e-2405-4803-c687-7f00-70c9-ff89-df9b-34d8.ngrok-free.app";
export const submitTask1 = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${prefix}/task1`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const submitTask2 = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${prefix}/task2`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const submitTask3 = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${prefix}/task3`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};
