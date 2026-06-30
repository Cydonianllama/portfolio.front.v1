/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { Contact } from "@/modules/showcase/contact";
import ClientShowcase from "../../modules/showcase/ClientShowcase";
import { api } from "@/setup/axios";
import { ResponsePagination } from "@/types/utils.pagination";

export default async function Page() {
  // fetch contacts on the server and pass to client component
  let listContacts: Contact[] = [];
  let responsePagination: ResponsePagination | null = null;
  try {
    console.log('listContacts')
    const req = await api.get("/api/contacts?workspace=workspace1");
    const data = req.data;
    if (data.status) {
      console.log('contacts fetched', data.data.length)
      listContacts = data.data ?? [];
      responsePagination = data.pagination ?? null;
    } else {
      console.log('error fetching contacts', req.status, req.data)
    }
  } catch (e: any) {
    console.log(e.message)
    // ignore fetch errors on server render
    listContacts = [];
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* client component receives server-fetched list */}
        <ClientShowcase  initialServerContacts={listContacts} responsePagination_={responsePagination || null} />
      </div>
    </main>
  );
}
