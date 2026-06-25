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
import { SectionA1 } from "./settings.a1.section"
import { SectionA2 } from "./settings.a2.section"

export const SettingsScreen = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="projects" orientation="vertical" className="gap-5">
        <TabsList variant="line" className="w-48 shrink-0">

          <div className="flex flex-col gap-2 w-full px-2">
            <div className="font-semibold">Personal</div>
            <TabsTrigger value="a1" className="justify-start gap-2">
              <TiUserOutline className="size-4" />
              Profile
              {/* <Badge className="ml-auto">8</Badge> */}
            </TabsTrigger>
            <TabsTrigger value="a2" className="justify-start gap-2">
              <RiAccountCircle2Line className="size-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="a3" className="justify-start gap-2">
              <FaRegBell className="size-4" />
              Notification
            </TabsTrigger>
            <TabsTrigger value="a4" className="justify-start gap-2">
              <LuBriefcaseBusiness className="size-4" />
              Organitzations
            </TabsTrigger>
            <TabsTrigger value="a5" className="justify-start gap-2">
              <FaCode className="size-4" />
              Dev settings
            </TabsTrigger>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2 w-full px-2">
            <div className="font-semibold">Settings</div>
            <TabsTrigger value="b1" className="justify-start gap-2">
              <MdOutlineSettingsInputComponent className="size-4" />
              Appereance
            </TabsTrigger>
            <TabsTrigger value="b2" className="justify-start gap-2">
              <BiHash className="size-4" />
              Shortcuts
            </TabsTrigger>
            <TabsTrigger value="b3" className="justify-start gap-2">
              <LuShieldCheck className="size-4" />
              SSO
            </TabsTrigger>
            <TabsTrigger value="b4" className="justify-start gap-2">
              <VscDebugDisconnect className="size-4" />
              Integrations
            </TabsTrigger>
          </div>

          <Separator className="my-2" />
          <div className="flex flex-col gap-2 w-full px-2">
            <div className="font-semibold">Billing settings</div>
            <TabsTrigger value="c1" className="justify-start gap-2">
              <ImFilesEmpty className="size-4" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="c2" className="justify-start gap-2">
              <FiCodesandbox className="size-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="c3" className="justify-start gap-2">
              <TiCreditCard className="size-4" />
              Billing
            </TabsTrigger>
          </div>

          <Separator className="my-2" />
          <div className="flex flex-col gap-2 w-full px-2">
            <TabsTrigger value="d1" className="justify-start gap-2">
              <FaPowerOff className="size-4 text-red-600" />
              Logout
            </TabsTrigger>
          </div>


        </TabsList>
        <TabsContent className='w-full' value="a1">
          <SectionA1 />
        </TabsContent>
        <TabsContent className='w-full' value="a2">
          <SectionA2 />
        </TabsContent>
        <TabsContent value="a3">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">
                Team Members
              </h3>
              <p>Manage your team and their access permissions.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="a4">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">Reports</h3>
              <p>View generated reports and export data.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="a5">
          <Card>
            <CardContent>
              <h3 className="text-foreground mb-2 font-semibold">wawa</h3>
              <p>View generated reports and export data.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}