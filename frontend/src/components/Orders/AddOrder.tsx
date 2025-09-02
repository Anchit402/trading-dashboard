import { OrdersForm } from "@/forms/OrdersForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useState } from "react";

function AddOrder() {
  const [open, setOpen] = useState(false);

  const onSuccess = useCallback(() => setOpen(false), []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild={true}>
          <Button variant="outline" size="sm">
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2 text-center">
              Create New Order
            </DialogTitle>
            <DialogDescription asChild={true}>
              <div>
                <OrdersForm onSuccess={onSuccess} />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddOrder;
