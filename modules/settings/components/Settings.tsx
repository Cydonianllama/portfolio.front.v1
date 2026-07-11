import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { BuildingIcon, CheckSquareIcon, FileTextIcon, FolderIcon, UserIcon, UsersIcon, ZapIcon } from 'lucide-react'

import { TiUserOutline } from "react-icons/ti";
import { RiAccountCircle2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { TiCreditCard } from "react-icons/ti";
import { FiCodesandbox } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { VscDebugDisconnect } from "react-icons/vsc";
import { LuShieldCheck } from "react-icons/lu";
import { BiHash } from "react-icons/bi";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { ProfileSection } from "./Sections/ProfileSection"
import { GeneralWorkspaceSection } from "./Sections/GeneralWorkspaceSection"
import { MembersSection } from "./Sections/MembersSection"
import { VariablesSection } from "./VariablesSection/VariablesSection"
import { IntegrationSection } from "./Sections/IntegrationSection"
import { PlansSection } from "./Sections/PlansSections"
import { SubscriptionSection } from "./Sections/SubscriptionSection"
import { BillingSection } from "./Sections/BillingSection"
import { TabHeaderDialogSettings } from "./TabHeader"

export const Settings = () => {
  return <>
    <div className="flex h-full w-full flex-col gap-6 p-0">
      <Tabs defaultValue="projects" orientation="vertical" className="gap-5 h-full">
        <TabsList variant="line" className="w-48 shrink-0  h-full ">
          <div className="flex flex-col gap-2 w-full ">
            <div className="font-semibold">Personal</div>
            <TabsTrigger value="profile" className="justify-start gap-2">
              <TiUserOutline className="size-4" />
              Perfil
            </TabsTrigger>
          </div>
          {/* <Separator className="my-2" /> */}
          <div className="flex flex-col gap-2 w-full ">
            <div className="font-semibold">Ajustes de Workspace</div>
            <TabsTrigger value="general" className="justify-start gap-2">
              <MdOutlineSettingsInputComponent className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="members" className="justify-start gap-2">
              <BiHash className="size-4" />
              Miembros
            </TabsTrigger>
            <TabsTrigger value="variables" className="justify-start gap-2">
              <LuShieldCheck className="size-4" />
              Variables
            </TabsTrigger>
            <TabsTrigger value="integrations" className="justify-start gap-2">
              <VscDebugDisconnect className="size-4" />
              Integraciones
            </TabsTrigger>
          </div>

          {/* <Separator className="my-2" />
          <div className="flex flex-col gap-2 w-full px-2 ">
            <div className="font-semibold">Billing settings</div>
            <TabsTrigger value="plans" className="justify-start gap-2">
              <ImFilesEmpty className="size-4" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="justify-start gap-2">
              <FiCodesandbox className="size-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="billing" className="justify-start gap-2">
              <TiCreditCard className="size-4" />
              Billing
            </TabsTrigger>
          </div> */}

          {/* <Separator className="my-2" />
          <div className="flex flex-col gap-2 w-full px-2">
            <TabsTrigger value="d1" className="justify-start gap-2">
              <FaPowerOff className="size-4 text-red-600" />
              Logout
            </TabsTrigger>
          </div> */}
        </TabsList>
        <TabsContent className={'h-full'} value="profile">
          <TabHeaderDialogSettings title="Perfil" />
          <div>
            <ProfileSection />
          </div>
        </TabsContent>
        <TabsContent value="general">
          <TabHeaderDialogSettings title="General" />
          <div>
            <GeneralWorkspaceSection />
          </div>
        </TabsContent>
        <TabsContent value="members">
          <TabHeaderDialogSettings title="Miembros" />
          <div>
            <MembersSection
              list={[]}
              loading={false}
              hasError={false}
            />
          </div>
        </TabsContent>
        <TabsContent value="variables">
          <TabHeaderDialogSettings title="Variables" />
          <div>
            <VariablesSection
              list={[]}
              loading={false}
              hasError={false}
            />
          </div>
        </TabsContent>
        <TabsContent value="integrations">
          <TabHeaderDialogSettings title="Integraciones" />
          <div>
            <IntegrationSection />
          </div>
        </TabsContent>
        <TabsContent value="plans">
          <TabHeaderDialogSettings title="Planes" />
          <div>
            <PlansSection />
          </div>
        </TabsContent>
        <TabsContent value="subscriptions">
          <TabHeaderDialogSettings title="Subscripciones" />
          <div>
            <SubscriptionSection />
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <TabHeaderDialogSettings title="Ordenes" />
          <div>
            <BillingSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </>
}