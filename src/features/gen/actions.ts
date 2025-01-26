"use server";

export const handleSubmit = async (formData: FormData) => {
  console.log("hi!");
  const data = Object.fromEntries(formData.entries());
  console.log(data);
};
