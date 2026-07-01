"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentUserDTO } from "../models/dto";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { UserPlus, Calendar } from "lucide-react";

interface SectionRecentUsersProps {
  data: RecentUserDTO[] | undefined;
  isLoading: boolean;
}

export const SectionRecentUsers = ({ data, isLoading }: SectionRecentUsersProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserPlus className="h-4 w-4 text-primary" />
          <CardTitle>Últimos usuarios</CardTitle>
        </div>
        <CardDescription>
          {isLoading ? "Cargando..." : `${data?.length ?? 0} usuarios recientes`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-2">
              {(data || []).length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
                  <Calendar className="h-8 w-8 opacity-50" />
                  <p className="text-sm">Sin usuarios recientes</p>
                </div>
              )}
              {(data || []).map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                    <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
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
                    <div className="flex items-center gap-2 mt-0.5">
                      {user.planName ? (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                          {user.planName}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Sin plan</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
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
