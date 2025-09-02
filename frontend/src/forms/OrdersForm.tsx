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

// const FormSchema = z.object({
//   symbol: z.string(),
//   side: z.enum(Side),
//   qty: z.coerce.number<number>(),
//   price: z.coerce.number<number>(),
// });

const FormSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  side: z.enum(Side),
  qty: z.coerce
    .number<number>()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
  price: z.coerce.number<number>().positive("Price must be greater than 0"),
});

export function OrdersForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symbol: "",
      side: Side.BUY,
      qty: 0,
      price: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
