"use client";

import UserSection from "./UserSection";
import WorkspaceSection from "./WorkspaceSection";
import { useDashboardStore } from "./store";

export default function Dashboard() {
  const activeTab = useDashboardStore((state) => state.activeTab);
  const setActiveTab = useDashboardStore((state) => state.setActiveTab);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {activeTab === "workspace" ? "Administración de workspaces" : "Administración de usuarios"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {activeTab === "workspace"
                ? "Visualiza y crea workspaces desde esta pantalla."
                : "Visualiza y administra los usuarios registrados."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("users")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "users"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              Usuarios
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("workspace")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "workspace"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              Workspace
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "users" ? <UserSection /> : <WorkspaceSection />}
      </div>
    </div>
  );
}
