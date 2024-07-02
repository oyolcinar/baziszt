const subscribeNewsletter = async (formData: {
  [key: string]: string;
}): Promise<void> => {
  const response = await fetch('https://baziszt.com/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData).toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to subscribe to newsletter');
  }
};

export default subscribeNewsletter;
