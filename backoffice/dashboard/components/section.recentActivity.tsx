"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityLogDTO } from "../models/dto";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Activity, UserPlus, Settings, Trash2, Edit3, FileText, AlertCircle } from "lucide-react";

interface SectionRecentActivityProps {
  data: ActivityLogDTO[] | undefined;
  isLoading: boolean;
}

// Map activity types to icons and colors
const activityConfig: Record<string, { icon: typeof Activity; color: string; bg: string; label: string }> = {
  CREATE: { icon: UserPlus, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Creación" },
  UPDATE: { icon: Edit3, color: "text-blue-500", bg: "bg-blue-500/10", label: "Actualización" },
  DELETE: { icon: Trash2, color: "text-red-500", bg: "bg-red-500/10", label: "Eliminación" },
  SETTINGS: { icon: Settings, color: "text-violet-500", bg: "bg-violet-500/10", label: "Configuración" },
  REPORT: { icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10", label: "Reporte" },
  DEFAULT: { icon: Activity, color: "text-primary", bg: "bg-primary/10", label: "Actividad" },
};

function getActivityConfig(typeAction: string) {
  const normalized = typeAction.toUpperCase();
  if (normalized.includes("CREATE") || normalized.includes("CREAR")) return activityConfig.CREATE;
  if (normalized.includes("UPDATE") || normalized.includes("EDIT")) return activityConfig.UPDATE;
  if (normalized.includes("DELETE") || normalized.includes("ELIMIN")) return activityConfig.DELETE;
  if (normalized.includes("SETTING") || normalized.includes("CONFIG")) return activityConfig.SETTINGS;
  if (normalized.includes("REPORT") || normalized.includes("INFORME")) return activityConfig.REPORT;
  return activityConfig.DEFAULT;
}

export const SectionRecentActivity = ({ data, isLoading }: SectionRecentActivityProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <CardTitle>Actividad reciente</CardTitle>
        </div>
        <CardDescription>
          {isLoading ? "Cargando..." : `${data?.length ?? 0} eventos registrados`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-3">
              {(data || []).length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 opacity-50" />
                  <p className="text-sm">Sin actividad reciente</p>
                </div>
              )}
              {(data || []).map((item) => {
                const config = getActivityConfig(item.typeAction);
                const Icon = config.icon;
                
                return (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className={`mt-0.5 rounded-full ${config.bg} p-2`}>
                      <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium leading-tight truncate">
                          {item.typeAction}
                        </p>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${config.bg} ${config.color} whitespace-nowrap`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.originAction}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70">
                        {format(new Date(item.creationDate), "dd MMM yyyy, HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
