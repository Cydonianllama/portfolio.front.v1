"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentUserDTO } from "../models/dto";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SectionRecentUsersProps {
  data: RecentUserDTO[] | undefined;
  isLoading: boolean;
}

export const SectionRecentUsers = ({ data, isLoading }: SectionRecentUsersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos usuarios</CardTitle>
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
                <p className="text-sm text-muted-foreground">Sin usuarios recientes</p>
              )}
              {(data || []).map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">
                      {user.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.fullname}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.planName ?? "Sin plan"}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(user.creationDate), "dd MMM", { locale: es })}
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
