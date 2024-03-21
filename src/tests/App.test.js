import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import Welcome from "../components/Welcome";
import CommentAreaFunction from "../components/CommentAreaFunction";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// 1.Verifica che il componente Welcome venga montato correttamente
test("renders welcome message", () => {
  const { getByText } = render(<Welcome />);
  const welcomeMessage = screen.getByText(/Benvenuti in EpiBooks/i);
  expect(welcomeMessage).toBeInTheDocument();
});

//2.Verifica che vengano effettivamente renderizzate tante bootstrap cards quanti sono i libri nel file json utilizzato.

//3.Verifica che il componente CommentArea venga renderizzato correttamente.
test("renders comment area correctly", async () => {
  const mockComments = [
    { _id: "1", text: "First comment" },
    { _id: "2", text: "Second comment" },
  ];

  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => mockComments,
  });

  const { getByText, queryByText } = render(<CommentAreaFunction asin="someAsin" />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });
});
//4.Verifica, magari con più tests, che il filtraggio dei libri tramite navbar si comporti come previsto.
//5.Verifica che, cliccando su un libro, il suo bordo cambi colore.
//6.Verifica che, cliccando su di un secondo libro dopo il primo, il bordo del primo libro ritorni normale.
//7.Verifica che all’avvio della pagina, senza aver ancora cliccato su nessun libro, non ci siano istanze del componente SingleComment all’interno del DOM.
//8.Verifica infine che, cliccando su di un libro con recensioni, esse vengano caricate correttamente all’interno del DOM.
