import { render, screen } from "@testing-library/react";
import App from "./App";

import Welcome from "../src/components/Welcome";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// 1.Verifica che il componente Welcome venga montato correttamente
test("renders welcome message", () => {
  const { getByText } = render(<Welcome />);
  const welcomeMessage = getByText(/Benvenuti in EpiBooks/i);
  expect(welcomeMessage).toBeInTheDocument();
});

//2.Verifica che vengano effettivamente renderizzate tante bootstrap cards quanti sono i libri nel file json utilizzato.
//3.Verifica che il componente CommentArea venga renderizzato correttamente.
//4.Verifica, magari con più tests, che il filtraggio dei libri tramite navbar si comporti come previsto.
