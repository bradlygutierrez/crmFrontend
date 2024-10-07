export default function EditCreateButton({ handleCreate, nameCreate }) {
    return (<div className="flex justify-between mb-4">
        <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Crear {nameCreate}
        </button>
       
    </div>);
}