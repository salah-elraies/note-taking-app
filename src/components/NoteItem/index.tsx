import { NotesControlType } from "../../App";
import "./style.css";
type noteItemProps = {
  item: { id: number; body: string };
  notesController: NotesControlType;
  setNotesController: React.Dispatch<React.SetStateAction<NotesControlType>>;
};
const NoteItem = ({
  item,
  notesController,
  setNotesController,
}: noteItemProps) => {
  const handleDelete = () => {
    setNotesController({
      ...notesController,
      data: notesController.data.filter((ele) => ele.id !== item.id),
    });
    localStorage.setItem(
      "notes",
      JSON.stringify(notesController.data.filter((ele) => ele.id !== item.id))
    );
  };
  const handleCancel = () => {
    setNotesController({ ...notesController, selectedNote: 0, noteValue: "" });
  };
  const handleEditNote = () => {
    const newData = notesController.data.map((ele) => {
      if (ele.id === item.id) {
        ele.body = notesController.noteValue;
      }
      return ele;
    });
    setNotesController({
      ...notesController,
      data: newData,
      selectedNote: 0,
      noteValue: "",
    });
    localStorage.setItem("notes", JSON.stringify(newData));
  };
  return (
    <div className="note_item_container">
      <textarea
        value={
          notesController.selectedNote === item.id
            ? notesController.noteValue
            : item.body
        }
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNotesController({
            ...notesController,
            noteValue: e.target.value,
          })
        }
        placeholder="Update note"
        disabled={notesController.selectedNote === item.id ? false : true}
      ></textarea>
      {notesController.selectedNote === item.id ? (
        <div className="update_btns_contaienr">
          <button className="cancel_btn" onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={handleEditNote}>Save</button>
        </div>
      ) : (
        <div className="view_btns_container">
          <button className="delete_btn" onClick={handleDelete}>
            Delete
          </button>
          <button
            onClick={() => {
              setNotesController({
                ...notesController,
                noteValue: item.body,
                selectedNote: item.id,
              });
            }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
