import { useQuery } from "@tanstack/react-query";
import { GetConversionService } from "../services";
import { configurationModule } from "../config";

export const useConversion = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'conversion'],
    queryFn: () => GetConversionService(),
  });
};
