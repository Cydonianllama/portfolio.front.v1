/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from '@/setup/axios';
import { User } from '@/types/user';
import { Workspace } from '@/types/workspace';
import { useEffect, useMemo, useState } from 'react';

type UserForm = {
  username: string;
  fullname: string;
  email: string;
  password: string;
};

export default function UserSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<UserForm>({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  // paginacion
  const [page, setPage] = useState(1)

  // workspaces asociados al usuario
  const [workspacesAsociated, setWorkspacesAsociated] = useState<Array<Workspace>>([]);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users]
  );

  const loadUsers = async (page: number) => {
    try {

      if (page == 1){
        // refresh all
        setUsers([])
      }

      setPage(page)

      const req = await api.get(`/api/users?page=${page}`);
      const data: any = req.data;

      if (data.status) {
        setUsers(data.data || []);
      } else {
        console.error(data.message);
      }
    } catch (ex: any) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadUsers(1)
  }, []);

  const loadWorkspaces = async () => {
    try {
      const req = await api.get(`/api/workspaces`);
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

  const openUserModal = (user?: User) => {
    setEditUserId(user?.id ?? null);
    setUserForm({
      username: user?.username ?? '',
      fullname: user?.fullname ?? '',
      email: user?.email ?? '',
      password: user?.password ?? '',
    });
    setUserModalOpen(true);
  };

  const closeUserModal = () => {
    setUserModalOpen(false);
    setEditUserId(null);
    setUserForm({ username: '', fullname: '', email: '', password: '' });
  };

  const openWorkspaceModal = async (userId?: string) => {
    setSelectedUserId(userId ?? null);
    setWorkspaceModalOpen(true);
    await loadWorkspaces();
    await ListWorkspacesAsociated(userId || '')
  };

  const closeWorkspaceModal = () => {
    setWorkspaceModalOpen(false);
    setSelectedUserId(null);
  };

  const createUser = async (): Promise<User | null> => {
    try {
      const req = await api.post('/api/users', {
        username: userForm.username,
        fullname: userForm.fullname,
        email: userForm.email,
        password: userForm.password,
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

  const handleUserSubmit = async () => {
    if (!userForm.username.trim() || !userForm.fullname.trim() || !userForm.email.trim() || !userForm.password.trim()) {
      return;
    }

    try {
      if (editUserId) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editUserId ? { ...user, ...userForm } : user
          )
        );
      } else {
        const createdUser = await createUser();

        if (createdUser) {
          setUsers((prev) => [...prev, createdUser]);
        } else {
          setUsers((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              username: userForm.username,
              fullname: userForm.fullname,
              email: userForm.email,
              password: userForm.password,
              qtyWorkspaces: 0,
              creationDate: new Date().toISOString().split('T')[0],
            },
          ]);
        }
      }

      closeUserModal();
    } catch (ex: any) {
      console.error(ex);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleAssociateWorkspace = async (workspaceId: string) => {
    if (!selectedUser) return;

    try {
      const req = await api.post(`/api/users/${selectedUser.id}/workspaces/${workspaceId}`, {});
      const data: any = req.data;

      if (data.status) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? { ...user, qtyWorkspaces: (user.qtyWorkspaces ?? 0) + 1 }
              : user
          )
        );
        closeWorkspaceModal();
      } else {
        console.error(data.message);
      }
    } catch (ex: any) {
      console.error(ex);
    }
  };

  const ListWorkspacesAsociated = async (userId: string) => {
    try {
      const req = await api.get(`/api/workspaces?userId=${userId}`)
      const data = req.data;

      if (data.status){
        // llenar seccion de workspaces asociados
        setWorkspacesAsociated(data.data || [])
      } else {

      }
    } catch (error: any) {
      
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Administración de usuarios</h1>
            <p className="mt-2 text-sm text-slate-600">
              Lista de usuarios registrados y acciones disponibles.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => loadUsers(1)}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Refrescar
            </button>
            <button
              type="button"
              onClick={() => openUserModal()}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Agregar usuario
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-medium">Fullname</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Password</th>
                <th className="px-4 py-3 font-medium">Qty Workspaces</th>
                <th className="px-4 py-3 font-medium">Creation Date</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{user.fullname}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">{user.password}</td>
                  <td className="px-4 py-4">{user.qtyWorkspaces}</td>
                  <td className="px-4 py-4">{user.creationDate}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openUserModal(user)}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => openWorkspaceModal(user.id)}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Asociar workspace
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isWorkspaceModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">
              {selectedUser ? `Asociar workspace a ${selectedUser.fullname}` : 'Agregar workspace'}
            </h2>
            <div>
              <p>Asociados</p>
              {workspacesAsociated.length == 0 && (<>
                No tienes workspaces asociados
              </>)}
              <div>
                {workspacesAsociated.map((el, index) => <div className='p-2 border rounded' key={index}>{el.name}</div>)}
              </div>
              <p className="mt-2 text-sm text-slate-600">Selecciona el workspace que deseas asociar.</p>
              <div className="mt-4 space-y-2">
                {workspaces.length === 0 ? (
                  <p className="text-sm text-slate-500">No hay workspaces disponibles.</p>
                ) : (
                  workspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      type="button"
                      onClick={() => handleAssociateWorkspace(workspace.id)}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm text-slate-900 transition hover:border-slate-400 hover:bg-slate-100"
                    >
                      {workspace.name}
                    </button>
                  ))
                )}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeWorkspaceModal}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isUserModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">{editUserId ? 'Editar usuario' : 'Agregar usuario'}</h2>
            <p className="mt-2 text-sm text-slate-600">Completa los datos del usuario para guardarlo.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Username
                <input
                  value={userForm.username}
                  onChange={(event) => setUserForm({ ...userForm, username: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Fullname
                <input
                  value={userForm.fullname}
                  onChange={(event) => setUserForm({ ...userForm, fullname: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Email
                <input
                  value={userForm.email}
                  onChange={(event) => setUserForm({ ...userForm, email: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  type="email"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Password
                <input
                  value={userForm.password}
                  onChange={(event) => setUserForm({ ...userForm, password: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  type="password"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeUserModal}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUserSubmit}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                {editUserId ? 'Guardar cambios' : 'Crear usuario'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
