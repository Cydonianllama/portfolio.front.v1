/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from '@/setup/axios'
import { User } from '@/types/user';
import { ResponsePagination } from '@/types/utils.pagination';
import { Workspace } from '@/types/workspace';

import { useEffect, useMemo, useState } from "react";

type UserForm = {
  username: string;
  fullname: string;
  email: string;
  password: string;
};

export default function Dashboard() {
  // listado de usuarios
  const [users, setUsers] = useState<User[]>([]);

  const [isWorkspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<UserForm>({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  // paginacion listado de usuarios
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<ResponsePagination | null>(null);

  // listado de seleccion de workspace
  const [workspaces, setWorkspaces] = useState<Array<Workspace>>([])

  const selectedUser = useMemo(
    () => users?.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users]
  );

  const handleOpenWorkspaceModal = (userId?: string) => {
    setSelectedUserId(userId ?? null);
    setWorkspaceName("");
    setWorkspaceModalOpen(true);
  };

  // creacion de workspace
  const handleWorkspaceSubmit = () => {
    if (!workspaceName.trim()) return;
    CreateWorkspace()
  };

  const handleOpenUserModal = (user?: User) => {
    setEditUserId(user?.id ?? null);
    setUserForm({
      username: user?.username ?? "",
      fullname: user?.fullname ?? "",
      email: user?.email ?? "",
      password: user?.password ?? "",
    });
    setUserModalOpen(true);
  };

  // validacion creacion de usuario
  const handleUserSubmit = async () => {
    try {
      if (!userForm.username.trim() || !userForm.fullname.trim() || !userForm.email.trim() || !userForm.password.trim()) {
        return;
      }

      await CreateUser()

      if (editUserId) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editUserId ? { ...user, ...userForm } : user
          )
        );
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
            creationDate: new Date().toISOString().split("T")[0],
          },
        ]);
      }

      setUserModalOpen(false);
      setEditUserId(null);
      setUserForm({ username: "", fullname: "", email: "", password: "" });
    } catch (error) {

    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // crear usuario
  const CreateUser = async () => {
    try {
      const req = await api.post('/api/users', {
        username: userForm.username,
        fullname: userForm.fullname,
        email: userForm.email,
        password: userForm.password
      })
      const data = req.data
      console.log(data)
      if (data.status) {
        // agregar usuario a la tabla

      } else {
        console.log(data.message)
      }
    } catch (ex: any) {
      console.log(ex.message)
    }
  }

  // listar usuarios
  const ListUsers = async (page: number) => {
    console.log('ListUsers')
    try {

      if (page == 1) {
        // limpiar usuarios para mostrar el loader
      } else {
        // actuaizar pagina en estado
        setPage(page)
      }

      const req = await api.get(`/api/users?page=${page}`)
      const data = req.data

      console.log(data)
      if (data.status) {
        setUsers(data.data || [])

        // agregar estado de paginacion
        const pagination = data.pagination;
        setPagination(pagination || null);

      } else {
        console.log(data.message)
      }
    } catch (ex: any) {
      console.log(ex.message)
    }
  }

  // listar workspaces
  const ListWorkspaces = async () => {
    try {
      const req = await api.get(`/api/workspaces`)
      const data = req.data;

      if (data.status) {
        const workspaces = data.data || [];
        setWorkspaces(workspaces)

        // creo que no realizaré paginacion
      } else {

      }

    } catch (ex: any) {
      console.log(ex.message)
    }
  }

  // crear workspace 
  const CreateWorkspace = async () => {
    try {
      const req = await api.post(`/api/workspaces`, {
        name: workspaceName
      })
      const data = req.data;

      if (data.status) {

        // aumentar el contador
        if (selectedUserId) {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === selectedUserId
                ? { ...user, qtyWorkspaces: user.qtyWorkspaces + 1 }
                : user
            )
          );
        }

        // cerrar modal
        setWorkspaceModalOpen(false);

        // limpiar estados
        setWorkspaceName("");
        setSelectedUserId(null);
      } else {

      }
    } catch (ex: any) {
      console.log(ex.message)
    }
  }

  // Al abrir el modal de workspace - listar los workspace disponibles para asociar con usuario
  useEffect(() => {
    // si está abierto y tiene usuario seleccionado listamos los workspaces
    if (isWorkspaceModalOpen && selectedUser) {
      ListWorkspaces()
    }
  }, [isWorkspaceModalOpen, selectedUser])

  // accion de asociar 
  const HandleToAsociateWorkspaceWithUser = async (workspaceId: string) => {
    try {

      if (!selectedUser){
        console.log('requiere usuario seleccionado')
        return;
      }

      const req = await api.post(`/api/users/${selectedUser.id}/workspaces/${workspaceId}`, {})
      const data = req.data;

      if (data.status){

      } else {

      }

    } catch (ex: any) {

    }
  }

  // On init
  useEffect(() => {
    ListUsers(1);
  }, []);

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
              onClick={() => handleOpenWorkspaceModal()}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Agregar workspace
            </button>
            <button
              type="button"
              onClick={() => handleOpenUserModal()}
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
              {users?.map((user) => (
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
                        onClick={() => handleOpenUserModal(user)}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenWorkspaceModal(user.id)}
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
              {selectedUser ? `Asociar workspace a ${selectedUser.fullname}` : "Agregar workspace"}
            </h2>
            {!selectedUser && (<>
              <p className="mt-2 text-sm text-slate-600">
                Ingresa el nombre del workspace para continuar.
              </p>
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
                  onClick={() => {
                    setWorkspaceModalOpen(false);
                    setSelectedUserId(null);
                  }}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleWorkspaceSubmit}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Guardar workspace
                </button>
              </div>
            </>)}
            {selectedUser && (<>
              <p className="mt-2 text-sm text-slate-600">
                Busca el workspace a asociar
              </p>

              <div>
                {workspaces.length == 0 ? (<>


                </>) : (<>
                  {workspaces.map((el, index) => (<div onClick={() => { HandleToAsociateWorkspaceWithUser(el.id) }} className='w-full p-2 border rounded cursor-pointer border-gray-400' key={index}>
                    {el.name}
                  </div>))}
                </>)}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setWorkspaceModalOpen(false);
                    setSelectedUserId(null);
                  }}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </>)}
          </div>
        </div>
      ) : null}

      {isUserModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">
              {editUserId ? "Editar usuario" : "Agregar usuario"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Completa los datos del usuario para guardarlo.
            </p>
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
                onClick={() => {
                  setUserModalOpen(false);
                  setEditUserId(null);
                }}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUserSubmit}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                {editUserId ? "Guardar cambios" : "Crear usuario"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
