// eslint-disable-next-line react/prop-types
function PopUpMessage({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      ></div>
      <div className="relative z-10 bg-snowWhite p-5 text-center w-[300px]">
        <p className="mb-4 text-sm text-richBlack font-bold">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold hover:bg-black hover:bg-opacity-55 text-richBlack"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold hover:bg-black hover:bg-opacity-55 text-richBlack"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpMessage;
