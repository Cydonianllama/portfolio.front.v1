'use server'
import { redirect } from "next/navigation";
import { ForgetPasswordScreen } from "@/modules/auth/components/forgetPassword/screen";

type PageProps = {
  searchParams: Promise<{
    validationCode?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { validationCode } = await searchParams;

  // reirect to login if code query dont exist
  if (!validationCode){
    redirect('/login')
  }

  return <>
    <ForgetPasswordScreen  validationCode={validationCode || ''} />
  </>
}