export interface SurveryData {
  connections: string;
  goals: string;
  hobbies: string;
  interests: string;
  skills: string;
}

export interface User {
  providerId: string | null;
  uid: string | null;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  username?: string | null;
  surveyData?: SurveryData | null;
}
