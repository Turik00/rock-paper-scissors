import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as useAppSelectorApi from '../../store/hooks';
import { store } from '../../store/store';
import Header from './Header';

describe('Header component', () => {
  test('renders "Rock Paper Scissors" as a text', () => {
    // Arrange

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Act
    // ... nothing

    // Assert
    const rockElement = screen.getByText('ROCK', { exact: false });
    expect(rockElement).toBeInTheDocument();
    const paperElement = screen.getByText('PAPER', { exact: false });
    expect(paperElement).toBeInTheDocument();
    const scissorsElement = screen.getByText('SCISSORS', { exact: false });
    expect(scissorsElement).toBeInTheDocument();
  });

  test('Initial Score should be 0', () => {

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const outputElement = screen.getByText('score');

    expect(outputElement.parentElement?.children[1].innerHTML).toBe('0');
  });

  test('Updates score per store update', () => {
    const useAppSelectorMock = jest.spyOn(useAppSelectorApi, 'useAppSelector')
    useAppSelectorMock.mockReturnValue({ score:2 });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const outputElement = screen.getByText('score');

    expect(outputElement.parentElement?.children[1].innerHTML).toBe('2');
  });

  //   test('renders "Changed!" if the button was clicked', () => {
  //     // Arrange
  //     render(<Header />);

  //     // Act
  //     const buttonElement = screen.getByRole('button');
  //     userEvent.click(buttonElement)

  //     // Assert
  //     const outputElement = screen.getByText('Changed!');
  //     expect(outputElement).toBeInTheDocument();
  //   });

  //   test('does not render "good to see you" if the button was clicked', () => {
  //      // Arrange
  //      render(<Header />);

  //      // Act
  //      const buttonElement = screen.getByRole('button');
  //      userEvent.click(buttonElement)

  //      // Assert
  //      const outputElement = screen.queryByText('good to see you', { exact: false });
  //      expect(outputElement).toBeNull();
  //   });
});
