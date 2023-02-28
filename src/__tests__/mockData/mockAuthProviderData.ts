export const providerData = [
  {
    providerId: 'google.com',
    uid: '12345',
    displayName: 'Test User',
    email: 'test@test.com',
    phoneNumber: null,
    photoURL: 'https://test.com/photo.png',
  },
];
export const googleUser = {
  providerData,
};

export const [userData] = providerData;

export const user = { ...userData, username: userData.email };
