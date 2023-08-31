import { NotesControlType } from "../../App";
import "./style.css";
type noteInputProps = {
  notesController: NotesControlType;
  setNotesController: React.Dispatch<React.SetStateAction<NotesControlType>>;
};
const NoteInput = ({ notesController, setNotesController }: noteInputProps) => {
  const handleAddNote = () => {
    if (notesController.noteValue.replaceAll(" ", "").length > 0) {
      setNotesController({
        ...notesController,
        data: [
          {
            id: notesController.data.length
              ? notesController.data[0].id + 1
              : 1,
            body: notesController.noteValue,
          },
          ...notesController.data,
        ],
        noteValue: "",
      });
      localStorage.setItem(
        "notes",
        JSON.stringify([
          {
            id: notesController.data.length
              ? notesController.data[0].id + 1
              : 1,
            body: notesController.noteValue,
          },
          ...notesController.data,
        ])
      );
    }
  };
  return (
    <div className="note_input_container">
      <textarea
        value={notesController.selectedNote ? "" : notesController.noteValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNotesController({ ...notesController, noteValue: e.target.value })
        }
        placeholder="Add note"
        disabled={notesController.selectedNote ? true : false}
      ></textarea>
      <button
        disabled={notesController.selectedNote ? true : false}
        onClick={handleAddNote}
      >
        Add Note
      </button>
    </div>
  );
};

export default NoteInput;
