import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AppModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onSubmit?: () => void;
  isFullWidth?: boolean;
  width?: number;
  style?: React.CSSProperties;
};

export function AppModal({
  children,
  open,
  setOpen,
  title,
  isFullWidth = false,
  width = 425,
  style,
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)} modal>
      <DialogContent
        className={(isFullWidth ? "w-[90%]" : `w-full`) + " max-h-[90vh]"}
        style={{
          ...style,
          maxWidth: "100%",
          width: isFullWidth ? "90%" : `${width}px`,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <DialogHeader>
          <div className="flex items-center">
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
