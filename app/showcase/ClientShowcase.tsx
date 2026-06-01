/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Contact } from "@/types/contact";
import { Message } from "@/types/message";
import { ResponsePagination } from "@/types/utils.pagination";

export default function ClientShowcase({ initialServerContacts, responsePagination_ }: { initialServerContacts: Contact[], responsePagination_?: ResponsePagination | null }) {
  const workspaceOptions = ["workspace1", "workspace2", "workspace3"];

  // listaremos los contactos en la seccion de la izquierda
  const [responsePagination, setResponsePagination] = useState<ResponsePagination | null>(responsePagination_ || null);
  const [page, setPage] = useState(responsePagination?.page || 1);
  const [contacts, setContacts] = useState<Contact[]>(() => initialServerContacts || []);

  // para abrir el modal de creacion de contacto
  const [showCreateModal, setShowCreateModal] = useState(false);

  // para abrir el modal de busqueda de contacto
  const [showSearchModal, setShowSearchModal] = useState(false);

  // para formularios de creacion
  const [createFullname, setCreateFullname] = useState("");
  const [createWorkspace, setCreateWorkspace] = useState(workspaceOptions[0]);

  // para formulario de busqueda
  const [searchQuery, setSearchQuery] = useState("");

  // para estado de seleccion de contacto
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  // estados para el filtro de busqueda de contactos
  const idTimeoutFilterRef = useRef<any>(null)

  // listado de contactos del filtro
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  //para el componente de mensaje draft
  const [draftMessage, setDraftMessage] = useState("");

  // para almacenar mensajes del contacto seleccionado
  const [messages, setMessages] = useState<Message[]>([]);

  // resetear el formulario de creación al cerrar el modal
  const resetCreateForm = () => {
    setCreateFullname("");
    setCreateWorkspace(workspaceOptions[0]);
  }

  // resetear formulario de busqueda
  const resetSearchForm = () => {
    setSearchQuery("");
  }

  // resetear listado de mensajes
  const resetMessages = () => {
    setMessages([])
  }

  // resetear listado de contactos
  const resetContacts = () => {
    setPage(1)
    setContacts([]);
  }

  const selectedContact = useMemo(
    () => contacts.find((contact) => contact.id === selectedContactId) ?? null,
    [contacts, selectedContactId]
  );

  const handleSelectContact = (contactId: string) => {
    console.log('selected contact', contactId)
    setSelectedContactId(contactId);
    setShowSearchModal(false);

    // resetear formulario de busqueda
    resetSearchForm();
  };

  const CreateContact = async () => {
    try {
      // validaciones previas al envio
      if (!createFullname.trim()) return;

      // reseteamos formulario
      resetCreateForm();
      // cerramos modal
      setShowCreateModal(false);

      const newContact: Contact = {
        id: `contact-${Date.now()}`,
        fullname: createFullname.trim(),
        workspaceId: createWorkspace,
      };

      const req = await axios.post("http://localhost:3030/api/contacts", {
        fullname: newContact.fullname,
        workspaceId: newContact.workspaceId,
      });

      const data = req.data;

      if (data.status) {
        console.log('contact created', req.data)
        const created = req.data?.data;

        // validamos que server devolvio nuevo contacto
        if (!created) {
          console.log('server did not return created contact with id', req.data)
          return;
        }

        // actualizamos el contacto con el id real asignado por el server
        newContact.id = created.id;

        // actualizamos UI inmediatamente con el nuevo contacto
        setContacts((prev) => [created, ...prev]);
      } else {
        console.log('error creating contact', req.status, req.data)
        // TODO: manejar error en creación de contacto (ej. mostrar toast)
      }

    } catch (ex) {
      // ignore for now
    }
  };

  const ListMessages = async () => {
    try {
      console.log('ListMessages')
      //TODO: limpiar mensajes
      resetMessages();

      // llamar mensajes del contacto seleccionado
      const req = await axios.get(`http://localhost:3030/api/messages/${selectedContactId}`);
      const data = req.data;

      if (data.status) {
        const messages = data.data ?? [];
        console.log(messages)
        setMessages(messages);
      }

    } catch (ex) {
      // ignore for now
      console.error('error fetching messages for contact', selectedContactId, ex)
    } finally {

    }
  }

  const SendMessage = async () => {
    try {
      const req = await axios.post(`http://localhost:3030/api/messages`, {
        contactId: selectedContactId,
        content: draftMessage,
        messageType: 1, // mensaje enviado por "me"
      });
      const data = req.data;

      if (data.status) {
        console.log('message sent', req.data)
        const createdMessage = data.data;
        // actualizar UI con nuevo mensaje
        setMessages((prev) => [...prev, createdMessage]);
      } else {
        console.log('error sending message', req.status, req.data)
      }
    } catch (ex) {
      console.error('error sending message', ex)
    } finally {

      // limpiar mensaje draft y refrescar lista de mensajes
      setDraftMessage("");
    }
  }

  const DeleteContact = async (contactId: string) => {
    try {
      const req = await axios.delete(`http://localhost:3030/api/contacts/${contactId}`);
      const data = req.data;

      if (data.status) {
        console.log('contact deleted', req.data)
        // actualizar UI removiendo el contacto eliminado
        setContacts((prev) => prev.filter((c) => c.id !== contactId));

        // si el contacto eliminado es el seleccionado, limpiar selección y mensajes
        if (selectedContactId === contactId) {
          // quitar selección de contacto
          setSelectedContactId(null);
          // limpiar listado de mensajes al eliminar contacto seleccionado
          resetMessages()
        }
      } else {
        console.log('error deleting contact', req.status, req.data)
      }

    } catch (ex) {
      console.error('error deleting contact', ex)
    }
  }

  const FinderContacts = async (query: string) => {
    try {
      const req = await axios.get(`http://localhost:3030/api/contacts?query=${encodeURIComponent(query)}&workspace=workspace1`);
      const data = req.data;

      if (data.status) {
        const contacts = data.data ?? [];
        console.log('contacts found', contacts)

        // actualizar listado de contactos filtrados para mostrar en el modal de busqueda
        setFilteredContacts(contacts);
      } else {
        console.log('error searching contacts', req.status, req.data)
      }

    } catch (ex) {
      console.error('error searching contacts', ex)
    }
  }

  const ListContact = async (page: number) => {
    try {
      if (page === 1) {
        // si es la primera página, reseteamos el listado para evitar duplicados
        resetContacts();
      } else {
        setPage(page);
      }

      const req = await axios.get(`http://localhost:3030/api/contacts?workspace=workspace1&page=${page}&limit=20`);
      const data = req.data;

      if (data.status){
        const contacts = data.data ?? [];
        console.log('contacts listed', contacts)

        // actualizar listado de contactos (append para paginación)
        setContacts((prev) => [...prev, ...contacts]);

        // validacion de paginacion
        const pagination = data.pagination;
        if (pagination) {
          setResponsePagination(pagination);
        } else {
          console.log('server did not return pagination info', req.data)
        }

      } else {
        console.log('error listing contacts', req.status, req.data)
      }

    } catch (ex) {
      console.error('error listing contacts', ex)
    }
  }


  // al seleccionar un contacto, traemos los mensajes de ese contacto
  useEffect(() => {
    if (!selectedContactId) return;
    ListMessages();
  }, [selectedContactId]);

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Showcase de Conversación</h1>
            <p className="mt-2 text-slate-600">Crea contactos, selecciona uno y chatea con ellos en tiempo real.</p>

            <button onClick={() => setShowCreateModal(true)} className="mt-4 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Crear
            </button>

            <button onClick={() => setShowSearchModal(true)} className="mt-4 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Buscar
            </button>
          </div>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Contactos</h2>
            <button onClick={() => ListContact(1)} className="mt-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Refrescar
            </button>
          </div>
          <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {/* server-provided list */}
            {contacts && contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <div
                  key={index}
                  // type="button"
                  onClick={() => handleSelectContact(contact.id || '')}
                  className={`w-full rounded-2xl border p-4 text-left transition hover:border-slate-400 ${selectedContactId === contact.id ? "border-slate-900 bg-slate-100" : "border-slate-200 bg-white"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">{contact.fullname}</p>
                      <p className="mt-1 text-sm text-slate-500">{contact.workspaceId}</p>
                    </div>
                    <div>
                      <button onClick={() => DeleteContact(contact.id || '')}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No hay contactos del server.</p>
            )}
          </div>
          <div>
            {/* paginacion */}
            {responsePagination && (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => ListContact(page - 1)}
                  disabled={!responsePagination.hasPreviousPage}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-200"
                >
                  Anterior
                </button> 
                <span className="text-sm text-slate-500">
                  Página {responsePagination.page} de {responsePagination.totalPages}
                </span>
                <button
                  onClick={() => ListContact(page + 1)}
                  disabled={!responsePagination.hasNextPage}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-200"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Conversación</h2>
              <p className="mt-1 text-sm text-slate-600">
                {selectedContact ? `Conversando con ${selectedContact.fullname}` : "Selecciona un contacto para iniciar conversaión."}
              </p>
            </div>
            {selectedContact && (
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">{selectedContact.workspaceId}</div>
            )}
          </div>

          <div className="mt-6 min-h-65 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            {!selectedContact ? (
              <div className="flex h-full items-center justify-center text-center text-slate-500">
                <p>Aquí se mostrará el listado de mensajes con el contacto seleccionado.</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                <p>No hay mensajes aún. Envía el primero desde la caja de texto.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-3xl p-4 shadow-sm ${message.messageType === 1 ? "bg-slate-900 text-white self-end" : "bg-white text-slate-900"
                      }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className="mt-2 text-xs text-slate-400">{message.contactId === "me" ? "Tú" : selectedContact.fullname}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="text-sm font-medium text-slate-700">
              Escribir mensaje
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="message"
                type="text"
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                disabled={!selectedContact}
                placeholder={selectedContact ? "Escribe tu mensaje aquí..." : "Selecciona un contacto primero..."}
                className="min-h-13 flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
              <button
                type="button"
                onClick={() => {
                  SendMessage();
                }}
                disabled={!selectedContact || !draftMessage.trim()}
                className="min-h-13 rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">Crear contacto</h3>
                <p className="mt-2 text-sm text-slate-600">Define el nombre y selectable el workspace para el contacto.</p>
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200">
                Cerrar
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Nombre completo
                <input
                  type="text"
                  value={createFullname}
                  onChange={(event) => setCreateFullname(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                  placeholder="Ej. Juan Pérez"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Workspace
                <select
                  value={createWorkspace}
                  onChange={(event) => setCreateWorkspace(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                >
                  {workspaceOptions.map((workspace) => (
                    <option key={workspace} value={workspace}>
                      {workspace}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Cancelar
              </button>
              <button type="button" onClick={CreateContact} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Guardar contacto
              </button>
            </div>
          </div>
        </div>
      )}

      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">Buscar contacto</h3>
                <p className="mt-2 text-sm text-slate-600">Busca por nombre o id y selecciona el contacto para iniciar conversación.</p>
              </div>
              <button type="button" onClick={() => setShowSearchModal(false)} className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200">
                Cerrar
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Nombre completo / id
                <input
                  ref={idTimeoutFilterRef}
                  type="text"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value)
                    clearTimeout(idTimeoutFilterRef.current || 0)
                    idTimeoutFilterRef.current = setTimeout(() => {
                      const query = event.target.value.trim().toLowerCase();
                      FinderContacts(query);
                    }, 600)
                  }}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                  placeholder="Busca por nombre o id"
                />
              </label>

              <div className="max-h-72 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-3">
                {filteredContacts.length === 0 ? (
                  <p className="text-sm text-slate-500">No se encontraron contactos.</p>
                ) : (
                  <div className="space-y-3">
                    {filteredContacts.map((contact) => (
                      <button key={contact.id} type="button" onClick={() => handleSelectContact(contact.id)} className="w-full rounded-3xl bg-white p-4 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-100">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">{contact.fullname}</p>
                            <p className="mt-1 text-sm text-slate-500">{contact.workspaceId}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-700">{contact.id.replace("contact-", "#")}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowSearchModal(false)} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
