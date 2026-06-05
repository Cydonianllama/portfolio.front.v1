'use server'

import { notFound } from "next/navigation";
import { MainSection } from "./main";

export default async function Page() {
  
  if (process.env.NODE_ENV == 'production'){
    notFound();
  }

  return <>
    <MainSection />
  </>
}