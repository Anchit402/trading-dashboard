"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Side } from "@/enums/side";
import { SymbolsAutocomplete } from "@/shared-components/SymbolAutocomplete/SymbolAutocomplete";
import { SideSelect } from "@/shared-components/SideSelect";
import type { PostOrderReq } from "@/types/orders";
import { usePostOrder } from "@/actions/postOrder.action";

const FormSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  side: z.enum(Side),
  qty: z.coerce
    .number<number>()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
  price: z.coerce.number<number>().positive("Price must be greater than 0"),
});

interface OrdersFormProps {
  onSuccess?: () => void;
}

export function OrdersForm({ onSuccess }: OrdersFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symbol: "",
      side: Side.BUY,
      qty: 0,
      price: 0,
    },
  });

  const { mutate: mutateOrder } = usePostOrder();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const req: PostOrderReq = data;
    mutateOrder(req, {
      onSuccess: () => onSuccess?.(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4">Symbol</FormLabel>
                <FormControl>
                  <SymbolsAutocomplete
                    name={field.name}
                    className="w-81/100"
                    selectedSymbol={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="side"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4">Side</FormLabel>
                <FormControl>
                  <SideSelect
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qty"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4">Quantity</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4">Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
