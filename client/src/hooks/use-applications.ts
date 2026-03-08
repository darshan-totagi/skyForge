import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { type InsertApplication } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSubmitApplication() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertApplication) => {
      const res = await apiRequest(
        api.applications.create.method,
        api.applications.create.path,
        data
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit application");
      }
      return api.applications.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Thank you for applying to SkyForger. We will contact you soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
