'use server'

import { notFound } from "next/navigation";

export default async function Page() {
  
  if (process.env.NODE_ENV == 'production'){
    notFound();
  }

  return <>
    Time goes by so slowly {process.env.NODE_ENV}
  </>
}