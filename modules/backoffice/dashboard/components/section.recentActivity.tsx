"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityLogDTO } from "../models/dto";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Activity } from "lucide-react";

interface SectionRecentActivityProps {
  data: ActivityLogDTO[] | undefined;
  isLoading: boolean;
}

export const SectionRecentActivity = ({ data, isLoading }: SectionRecentActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <ScrollArea className="h-[250px] pr-4">
            <div className="space-y-4">
              {(data || []).length === 0 && (
                <p className="text-sm text-muted-foreground">Sin actividad reciente</p>
              )}
              {(data || []).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.typeAction}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.originAction}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.creationDate), "dd MMM yyyy, HH:mm", { locale: es })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
