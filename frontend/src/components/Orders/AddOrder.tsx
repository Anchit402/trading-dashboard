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

function AddOrder() {
  return (
    <div>
      <Dialog>
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
                <OrdersForm />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddOrder;
