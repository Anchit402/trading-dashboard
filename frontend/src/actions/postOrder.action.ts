import { api } from "@/api";
import type { ApiResponse } from "@/types/api";
import type { OrderDTO, PostOrderReq } from "@/types/orders";
import { useMutation } from "@tanstack/react-query";

async function postOrder(body: PostOrderReq) {
  try {
    const { data: response } = await api.post<null, ApiResponse<OrderDTO>>(
      `order`,
      body
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (exception) {
    throw new Error(exception?.toString() ?? "Error in creating order");
  }
}

export function usePostOrder() {
  return useMutation({
    mutationKey: ["order", "post"],
    mutationFn: (req: PostOrderReq) => {
      return postOrder(req);
    },
  });
}
