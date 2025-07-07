export interface ConfirmModalBodyProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  disabledConfirm?: boolean;
}

export function ConfirmModalBody({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  cancelColor = "secondary",
  disabledConfirm = false,
}: ConfirmModalBodyProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {message && <p>{message}</p>}
      <div className="flex gap-4">
        <button
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
          style={confirmColor ? { backgroundColor: confirmColor } : {}}
          onClick={onConfirm}
          disabled={disabledConfirm}
        >
          {confirmText}
        </button>
        <button
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
          onClick={onCancel}
          style={cancelColor ? { backgroundColor: cancelColor } : {}}
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
