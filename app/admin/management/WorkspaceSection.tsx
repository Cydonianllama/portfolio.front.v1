/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from '@/setup/axios';
import { WorkspaceAdminDTO } from '@/types/admin/workspace.dto';
import { Workspace } from '@/types/workspace';
import { useEffect, useState } from 'react';

export default function WorkspaceSection() {
  const [workspaces, setWorkspaces] = useState<WorkspaceAdminDTO[]>([]);
  const [workspaceName, setWorkspaceName] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  // paginaion
  const [page, setPage] = useState(1);

  const loadWorkspaces = async (page: number) => {
    try {

      if (page == 1){
        // refresh all
        setWorkspaces([])
      }

      setPage(page)

      const req = await api.get(`/api/admin/workspaces?page=${page}`);
      const data: any = req.data;

      if (data.status) {
        setWorkspaces(data.data || []);
      } else {
        console.error(data.message);
      }
    } catch (ex: any) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadWorkspaces(1);
  }, []);

  const createWorkspace = async (): Promise<WorkspaceAdminDTO | null> => {
    try {
      const req = await api.post(`/api/workspaces`, {
        name: workspaceName,
      });
      const data: any = req.data;

      if (data.status) {
        return data.data || null;
      }

      console.error(data.message);
      return null;
    } catch (ex: any) {
      console.error(ex);
      return null;
    }
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;

    const createdWorkspace = await createWorkspace();
    if (createdWorkspace) {
      setWorkspaces((prev) => [...prev, createdWorkspace]);
      setWorkspaceName('');
      setModalOpen(false);
    }
  };

  const formatDate = (value: string | Date) => {
    if (!value) return '-';
    if (value instanceof Date) return value.toLocaleDateString();
    return new Date(value).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Administración de workspaces</h1>
            <p className="mt-2 text-sm text-slate-600">
              Visualiza y crea workspaces desde esta pantalla.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => loadWorkspaces(1)}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Refrescar
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Agregar workspace
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Dueño</th>
                <th className="px-4 py-3 font-medium">Creado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {workspaces.map((workspace) => (
                <tr key={workspace.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{workspace.name}</td>
                  <td className="px-4 py-4">{workspace.userFromWorkspaceName || '-'}</td>
                  <td className="px-4 py-4">{formatDate(workspace.creationDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Agregar workspace</h2>
            <p className="mt-2 text-sm text-slate-600">Ingresa el nombre del workspace para guardarlo.</p>
            <label className="mt-6 block text-sm font-medium text-slate-700">
              Nombre de workspace
            </label>
            <input
              value={workspaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Nombre del workspace"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateWorkspace}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Guardar workspace
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
