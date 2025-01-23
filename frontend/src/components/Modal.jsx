
const Modal = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <p>{message}</p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  