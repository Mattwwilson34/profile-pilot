export interface SurveryQuestion {
  question: string;
  answer: string;
}

export interface User {
  providerId: string | null;
  uid: string | null;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  username?: string | null;
  surveyQuestions?: SurveryQuestion[];
}
