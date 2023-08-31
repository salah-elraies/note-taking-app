import NoteItem from "../NoteItem";
import { NotesControlType } from "../../App";

type NoteListProps = {
  notesController: NotesControlType;
  setNotesController: React.Dispatch<React.SetStateAction<NotesControlType>>;
};
const NoteList = ({ notesController, setNotesController }: NoteListProps) => {
  return (
    <div className="note_list_contaienr">
      {notesController[notesController.search ? "filterData" : "data"].map(
        (item) => (
          <NoteItem
            item={item}
            key={item.id}
            notesController={notesController}
            setNotesController={setNotesController}
          />
        )
      )}
    </div>
  );
};

export default NoteList;
