/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from '@/setup/axios';
import { User } from '@/types/user.backoffice.dto';
import { ResponsePagination } from '@/types/utils.pagination';
import { Workspace } from '@/types/workspace';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDashboardStore } from "./store";
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';

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
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  // buscador de workspaces
  const [textWorkspaceSearch, setTextWorkpsaceSaerch] = useState('')
  const idTextWorkspaceSearch = useRef<any>(null)
  const [pageSearchWorkspace, setPageSearchWorkspace] = useState(1)
  const [paginationSearchworkspace, setPaginationSearchWorkspace] = useState<ResponsePagination | null>(null)

  // buscador de usuarios
  const [textUserSearch, setTextUserSearch] = useState('')
  const idTextUserSearch = useRef<any>(null)
  const [page, setPage] = useState(1)
  const [paginationUser, setPaginationUser] = useState<ResponsePagination | null>(null)

  // workspaces asociados al usuario
  const [workspacesAsociated, setWorkspacesAsociated] = useState<Array<Workspace>>([]);

  // dialog confirm deletion
  const openDialogConfirmDeletion = useDashboardStore((state) => state.isDialogConfirmDeletionActive);
  const setOpenDialogConfirmDeletion = useDashboardStore((state) => state.setisDialogConfirmDeletionActive);
  const userToDelete = useDashboardStore((state) => state.userToDelete);
  const setUserToDelete = useDashboardStore((state) => state.setUserToDelete);

  // change pass states
  const [newPass, setNewPass] = useState<string | null>(null)
  const changePassData = useDashboardStore((state) => state.changePass);
  const setChangePassData = useDashboardStore((state) => state.setChangePass);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users]
  );

  const loadUsers = async (query: string, page: number) => {
    try {
      setIsLoadingUsers(true);
      if (page == 1) {
        // refresh all
        setUsers([])
      }

      setPage(page)

      const req = await api.get(`/api/backoffice/users?page=${page}${query ? `&query=${query}` : ''}`);
      const data: any = req.data;

      if (data.status) {
        setUsers(data.data || []);
        setPaginationUser(data.pagination)
      } else {
        console.error(data.message);
      }
    } catch (ex: any) {
      console.error(ex);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers('', 1)
  }, []);

  const loadWorkspaces = async (query: string, page: number) => {
    try {
      setIsLoadingWorkspaces(true);
      // query ya viene con valor 
      // page se seteara
      if (page == 1) {
        // clear
      }

      setPageSearchWorkspace(page)

      const req = await api.get(`/api/workspaces?page=${page}${query ? `&query=${query}` : ''}`);
      const data: any = req.data;

      if (data.status) {
        setWorkspaces(data.data || []);
        setPaginationSearchWorkspace(data.pagination)
      } else {
        console.error(data.message);
      }
    } catch (ex: any) {
      console.error(ex);
    } finally {
      setIsLoadingWorkspaces(false);
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
    await loadWorkspaces('', 1);
    await ListWorkspacesAsociated(userId || '')
  };

  const closeWorkspaceModal = () => {
    setWorkspaceModalOpen(false);
    setSelectedUserId(null);
  };

  const UpdateUser = async () => {
    try {
      if (!editUserId) {
        console.log('not user selected founded - return')
        return;
      }
      const req = await api.put(`/api/users/${editUserId}`, {
        username: userForm.username,
        fullname: userForm.fullname,
        email: userForm.email
      })
      const data = req.data;
      if (data.status) {
        // 
        const userUpdated = data.data;
        return userUpdated
      } else {

      }
    } catch (ex: any) {

    }
  }

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

  // guardar o crear usuario
  const handleUserSubmit = async () => {
    if (!userForm.username.trim() || !userForm.fullname.trim() || !userForm.email.trim()) {
      return;
    }

    try {
      if (editUserId) {

        await UpdateUser();

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

  // cuando el usuario presione el boton eliminar del listado
  const handleDeleteUser = async (id: string) => {
    setUserToDelete(id)
    setOpenDialogConfirmDeletion(true)
  };

  // cuando el usuario presione el boton confirmar eliminacion
  const DeleteUser = async (id: string) => {
    try {
      const req = await api.delete(`/api/users/${id}`)
      const data = req.data;
      if (data.status) {
        // eliminacion por front
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {

      }
    } catch (ex: any) {

    } finally {
      // limpiar estados
      setOpenDialogConfirmDeletion(false)
      setUserToDelete(null)
    }
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

  const handleToRemoveWorkspaceAsociation = async (workspaceId: string, userId: string) => {
    try {
      const req = await api.delete(`/api/users/${userId}/workspaces/${workspaceId}`)
      const data = req.data;

      if (req.status) {
        console.log('exito')
        // remover en front
        const workspacesAsociated_ = workspacesAsociated
        setWorkspacesAsociated(workspacesAsociated_.filter(el => el.id == workspaceId))
      } else {

      }
    } catch (ex: any) {

    }
  }

  const ListWorkspacesAsociated = async (userId: string) => {
    try {
      const req = await api.get(`/api/workspaces?userId=${userId}`)
      const data = req.data;

      if (data.status) {
        // llenar seccion de workspaces asociados
        setWorkspacesAsociated(data.data || [])
      } else {

      }
    } catch (error: any) {

    }
  }

  // Cambiar contraseña
  const UpdatePassword = async () => {
    try {

      if (!changePassData) return;

      if (!changePassData.userToChange) return;

      const req = await api.put(`/api/users/${changePassData.userToChange}/pass`, { newPassword: newPass })
      const data = req.data;

      if (data.status) {
        console.log(data.data)
      } else {

      }

    } catch (ex) {

    } finally {
      // clear states
      setChangePassData({
        isOpen: false,
        userToChange: null
      })
      setNewPass('')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Usuarios</h1>
          <p className="mt-2 text-slate-600">Gestiona todos los usuarios y sus espacios de trabajo</p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl bg-white shadow-sm border border-slate-200">
          {/* Search & Actions Bar */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                value={textUserSearch}
                placeholder='Buscar usuarios...'
                onChange={(test) => {
                  clearTimeout(idTextUserSearch.current || '')
                  setTextUserSearch(test.target.value)
                  idTextUserSearch.current = setTimeout(() => {
                    loadUsers(test.target.value, 1)
                  }, 600)
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => loadUsers('', 1)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                ↻ Refrescar
              </button>
              <button
                type="button"
                onClick={() => openUserModal()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                + Nuevo usuario
              </button>
            </div>
          </div>

          {/* Table or Loader or Empty State */}
          {isLoadingUsers ? (
            <div className="p-12">
              <Loader message="Cargando usuarios..." />
            </div>
          ) : users.length === 0 ? (
            <div className="p-12">
              <EmptyState
                title="No hay usuarios"
                description="Crea el primer usuario para comenzar"
                action={{
                  label: "+ Crear usuario",
                  onClick: () => openUserModal()
                }}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Nombre</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Email</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Workspaces</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Registrado</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id} className={`border-b border-slate-200 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-slate-50`}>
                      <td className="px-6 py-4 font-medium text-slate-900">{user.fullname}</td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          {user.qtyWorkspaces ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">{user.creationDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openUserModal(user)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            ✎ Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => openWorkspaceModal(user.id)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            🔗 Asociar
                          </button>
                          <button
                            type="button"
                            onClick={() => setChangePassData({ isOpen: true, userToChange: user.id })}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            🔐 Pass
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                          >
                            🗑 Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {users.length > 0 && (
            <Pagination
              pagination={paginationUser}
              currentPage={page}
              onPreviousPage={() => loadUsers(textUserSearch, page - 1)}
              onNextPage={() => loadUsers(textUserSearch, page + 1)}
            />
          )}
        </div>
      </div>

      {isWorkspaceModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              {selectedUser ? `Asociar workspace a ${selectedUser.fullname}` : 'Agregar workspace'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">Selecciona un workspace para asociar al usuario</p>

            {/* Associated Workspaces */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Workspaces asociados</h3>
              {workspacesAsociated.length === 0 ? (
                <EmptyState
                  title="Sin asociaciones"
                  description="No hay workspaces asociados aún"
                />
              ) : (
                <div className='space-y-2 max-h-40 overflow-y-auto'>
                  {workspacesAsociated.map((el) => (
                    <div
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
                      key={el.id}
                    >
                      <span className="text-sm font-medium text-slate-900">{el.name}</span>
                      <button
                        className="rounded-lg border border-rose-300 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                        onClick={() => {
                          handleToRemoveWorkspaceAsociation(el.id, el.mainUserId)
                        }}
                      >
                        Desasociar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className='my-4' />

            {/* Search & Select Workspaces */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Buscar workspaces</h3>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                value={textWorkspaceSearch}
                placeholder='Buscar workspace...'
                onChange={(test) => {
                  clearTimeout(idTextWorkspaceSearch.current || '')
                  setTextWorkpsaceSaerch(test.target.value)
                  idTextWorkspaceSearch.current = setTimeout(() => {
                    loadWorkspaces(test.target.value, 1)
                  }, 600)
                }}
              />

              {isLoadingWorkspaces ? (
                <div className="mt-4">
                  <Loader message="Cargando workspaces..." />
                </div>
              ) : workspaces.length === 0 ? (
                <div className="mt-4">
                  <EmptyState title="No hay workspaces disponibles" />
                </div>
              ) : (
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      type="button"
                      onClick={() => handleAssociateWorkspace(workspace.id)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-100 hover:border-slate-300"
                    >
                      {workspace.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {workspaces.length > 0 && (
                <Pagination
                  pagination={paginationSearchworkspace}
                  currentPage={pageSearchWorkspace}
                  onPreviousPage={() => loadWorkspaces(textWorkspaceSearch, pageSearchWorkspace - 1)}
                  onNextPage={() => loadWorkspaces(textWorkspaceSearch, pageSearchWorkspace + 1)}
                  compact
                />
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeWorkspaceModal}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isUserModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">{editUserId ? '✎ Editar usuario' : '+ Nuevo usuario'}</h2>
            <p className="mt-1 text-sm text-slate-600">Completa los datos para guardar</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Username
                <input
                  value={userForm.username}
                  onChange={(event) => setUserForm({ ...userForm, username: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  placeholder="juan_doe"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Nombre completo
                <input
                  value={userForm.fullname}
                  onChange={(event) => setUserForm({ ...userForm, fullname: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  placeholder="Juan Doe"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Email
                <input
                  value={userForm.email}
                  onChange={(event) => setUserForm({ ...userForm, email: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  type="email"
                  placeholder="juan@example.com"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeUserModal}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUserSubmit}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {editUserId ? 'Guardar cambios' : 'Crear usuario'}
              </button>
            </div>
          </div>
        </div>
      ) : null}


      {(openDialogConfirmDeletion && userToDelete) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                <span className="text-lg">⚠️</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Eliminar usuario</h2>
            </div>
            <p className="mt-4 text-sm text-slate-600">Esta acción no se puede deshacer. ¿Estás seguro?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpenDialogConfirmDeletion(false)
                  setUserToDelete(null)
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  DeleteUser(userToDelete || '')
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {(changePassData?.isOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">🔐 Cambiar contraseña</h2>
            <p className="mt-1 text-sm text-slate-600">Ingresa la nueva contraseña del usuario</p>
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nueva contraseña
              </label>
              <input
                placeholder='Ingresa la nueva contraseña'
                value={newPass || ''}
                onChange={(w) => setNewPass(w.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                type="password"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setChangePassData({
                    isOpen: false,
                    userToChange: null
                  })
                  setNewPass('')
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  UpdatePassword()
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Actualizar contraseña
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
