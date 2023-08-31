import { useEffect, useState } from "react";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import "./App.css";

export type NotesControlType = {
  data: { id: number; body: string }[];
  filterData: { id: number; body: string }[];
  search: string;
  noteValue: string;
  selectedNote: number;
};
const initNotes: NotesControlType = {
  data: [],
  filterData: [],
  noteValue: "",
  search: "",
  selectedNote: 0,
};
function App() {
  const [notesController, setNotesController] =
    useState<NotesControlType>(initNotes);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotesController({
      ...notesController,
      search: e.target.value,
      filterData: notesController.data.filter((item) =>
        item.body.includes(e.target.value)
      ),
    });
  };
  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNotesController({
        ...notesController,
        data: JSON.parse(localStorage.getItem("notes")!),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="app">
      <main className="app_container">
        <nav className="search_container">
          <input
            type="text"
            value={notesController.search}
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleSearch(e);
            }}
          />
        </nav>
        <NoteInput
          notesController={notesController}
          setNotesController={setNotesController}
        />
        <NoteList
          notesController={notesController}
          setNotesController={setNotesController}
        />
      </main>
    </div>
  );
}

export default App;
