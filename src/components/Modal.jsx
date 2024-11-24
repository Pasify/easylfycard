import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
// refactor jsx

function Modal({
  transactionData,
  isOpen,
  onClose,
  title,
  renderContent,
  footerActions,
}) {
  // transactionData = transactionData.data;
  // console.log(transactionData);
  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody>
        {renderContent ? (
          renderContent({ transactionData })
        ) : (
          <p>No content Provided</p>
        )}
      </DialogBody>

      {/* Footer */}

      {footerActions ? (
        <DialogFooter>{footerActions(onClose)}</DialogFooter>
      ) : (
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={onClose}>
            <span>close</span>
          </Button>
        </DialogFooter>
      )}
    </Dialog>
  );
}

export default Modal;
