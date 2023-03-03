import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import Root from '../../routes/Root';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { getUserFromFirestoreById } from '../../firebase/firebase-db';

jest.mock('../../firebase/firebase-db');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const renderRootRoute = async (): Promise<void> => {
  const queryClient = new QueryClient();
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
};

describe('<Root />', () => {
  it('render login page if user is not logged in', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({
      children,
    }: {
      children: React.ReactNode;
    }): JSX.Element => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const user = {
      email: 'test@test.com',
      surveyData: { true: true },
      docId: '1',
    };
    (getUserFromFirestoreById as jest.Mock).mockResolvedValue(user);
    localStorage.setItem('profile-pilot', JSON.stringify(user));
    const { result } = renderHook(
      () =>
        useQuery(
          'user',
          async () => await getUserFromFirestoreById(user.docId)
        ),
      { wrapper }
    );

    await renderRootRoute();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(mockedUsedNavigate).toHaveBeenCalledWith(`/profile/${user.docId}`);
    });
  });
});
