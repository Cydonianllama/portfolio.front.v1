/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from '@/setup/axios';
import { User } from '@/types/user';
import { ResponsePagination } from '@/types/utils.pagination';
import { Workspace } from '@/types/workspace';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDashboardStore } from "./store";

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

      if (page == 1) {
        // refresh all
        setUsers([])
      }

      setPage(page)

      const req = await api.get(`/api/users?page=${page}${query ? `&query=${query}` : ''}`);
      const data: any = req.data;

      if (data.status) {
        setUsers(data.data || []);
        setPaginationUser(data.pagination)
      } else {
        console.error(data.message);
      }
    } catch (ex: any) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadUsers('', 1)
  }, []);

  const loadWorkspaces = async (query: string, page: number) => {
    try {

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
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Administración de usuarios</h1>
            <p className="mt-2 text-sm text-slate-600">
              Lista de usuarios registrados y acciones disponibles.
            </p>
            <input
              type="text"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              value={textUserSearch}
              placeholder='Buscar'
              onChange={(test) => {
                clearTimeout(idTextUserSearch.current || '')
                setTextUserSearch(test.target.value)
                idTextUserSearch.current = setTimeout(() => {
                  // search
                  loadUsers(test.target.value, 1)
                }, 600)
              }}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => loadUsers('', 1)}
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
                        onClick={() => setChangePassData({ isOpen: true, userToChange: user.id })}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Cambiar contraseña
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
        <div className='flex gap-1 items-center'>

          <button
            disabled={paginationUser?.hasPreviousPage ? false : true}
            onClick={() => {
              loadUsers(textUserSearch, page - 1)
            }}
          >
            Prev
          </button>
          {paginationUser?.total}
          <button
            disabled={paginationUser?.hasNextPage ? false : true}
            onClick={() => {
              loadUsers(textUserSearch, page + 1)
            }}
          >
            Next
          </button>
        </div>
      </div>

      {isWorkspaceModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">
              {selectedUser ? `Asociar workspace a ${selectedUser.fullname}` : 'Agregar workspace'}
            </h2>
            <div>
              <p className="mt-2 text-sm text-slate-600">Workspaces asociados</p>
              {workspacesAsociated.length == 0 && (<>
                No tienes workspaces asociados
              </>)}
              <div className='space-y-2'>
                {workspacesAsociated.map((el, index) => <div
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm text-slate-900 transition hover:border-slate-400 hover:bg-slate-100" key={index}
                >
                  <div>{el.name}</div>
                  <div>
                    <button
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      onClick={() => {
                        handleToRemoveWorkspaceAsociation(el.id, el.mainUserId)
                      }}
                    >
                      Eliminar asociacion
                    </button>
                  </div>
                </div>)}
              </div>
              <hr className='my-4' />
              <div>
                <input
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  value={textWorkspaceSearch}
                  placeholder='Buscar'
                  onChange={(test) => {
                    clearTimeout(idTextWorkspaceSearch.current || '')
                    setTextWorkpsaceSaerch(test.target.value)
                    idTextWorkspaceSearch.current = setTimeout(() => {
                      // search
                      loadWorkspaces(test.target.value, 1)
                    }, 600)
                  }}
                />
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
              <div className='flex gap-2 items-center'>
                <button
                  onClick={() => {
                    loadWorkspaces(textWorkspaceSearch, pageSearchWorkspace - 1)
                  }}
                  disabled={paginationSearchworkspace?.hasPreviousPage ? true : false}
                >
                  Prev
                </button>
                {paginationSearchworkspace?.total}
                <button
                  onClick={() => {
                    loadWorkspaces(textWorkspaceSearch, pageSearchWorkspace + 1)
                  }}
                  disabled={paginationSearchworkspace?.hasNextPage ? false : true}
                >
                  Next
                </button>
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
              {/* <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Password
                <input
                  value={userForm.password}
                  onChange={(event) => setUserForm({ ...userForm, password: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  type="password"
                />
              </label> */}
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


      {(openDialogConfirmDeletion && userToDelete) && (<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Eliminar usuario</h2>
            <p className="mt-2 text-sm text-slate-600">Estas seguro de eliminar el usuario?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpenDialogConfirmDeletion(false)
                  setUserToDelete(null)
                }}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  DeleteUser(userToDelete || '')
                }}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </>)}

      {(changePassData?.isOpen) && (<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Cambiar contraseña</h2>
            <p className="mt-2 text-sm text-slate-600">Actualiza la contraseña del usuario</p>
            <div>
              <div>
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2"> Contraseña </label>
                <input
                  placeholder='Nueva contraseña'
                  value={newPass || ''}
                  onChange={(w) => setNewPass(w.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  type="email"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setChangePassData({
                    isOpen: false,
                    userToChange: null
                  })
                }}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  UpdatePassword()
                }}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </>)}

    </div>
  );
}
