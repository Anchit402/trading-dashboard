import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@/types/api";
import type { SymbolDTO } from "@/types/symbols";

async function fetchSymbols() {
  try {
    const { data: response } = await api.get<null, ApiResponse<SymbolDTO[]>>(
      `symbols`
    );

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (exception) {
    throw new Error(exception?.toString() ?? "Error in finding symbols");
  }
}

export function useSymbols() {
  return useQuery({
    queryKey: ["symbols"],
    queryFn: () => fetchSymbols(),
  });
}
