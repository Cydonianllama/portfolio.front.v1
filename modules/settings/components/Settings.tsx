'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AiOutlineTags } from "react-icons/ai";

import { TiUserOutline } from "react-icons/ti";
import { LuSettings2 } from "react-icons/lu";
import { FiCodesandbox } from "react-icons/fi";
import { VscDebugDisconnect } from "react-icons/vsc";
import { ProfileSection } from "./PofileSection/ProfileSection"
import { GeneralWorkspaceSection } from "./GeneralWorkspaceSection/GeneralWorkspaceSection"
import { MembersSection } from "./MembersSection/MembersSection"
import { VariablesSection } from "./VariablesSection/VariablesSection"
import { IntegrationSection } from "./IntegrationSection/IntegrationSection"
import { PlansSection } from "./PlansSection/PlansSections"
import { SubscriptionSection } from "./SubscriptionSection/SubscriptionSection"
import { TabHeaderDialogSettings } from "./TabHeader"
import { TbCodeVariable } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { TagsSection } from "./TagsSection/TagsSection";
import { ModulesSection } from "./ModulesSection/modulesSection";
import { GoDatabase } from "react-icons/go";
import { BsChatDots, BsMeta } from "react-icons/bs";
import { settingsInfo, tabsSettings } from "../catalog";
import { SettingsContentLayout } from "./settingsContentLayout";
import { WidgetScreen } from "@/modules/widget/components";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { RiTiktokLine } from "react-icons/ri";

export const Settings = () => {
  return <>
    <div className="flex h-full w-full flex-col gap-6 p-0">
      <Tabs defaultValue="projects" orientation="vertical" className="gap-5 h-full">
        {/*  */}
        <TabsList variant="line" className="w-48 shrink-0  h-full space-y-2">
          <div className="flex flex-col gap-2 w-full ">
            <div className="font-semibold text-sm">Personal</div>
            <TabsTrigger value="profile" className="justify-start gap-2">
              <TiUserOutline className="size-4" />
              Perfil
            </TabsTrigger>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <div className="font-semibold text-sm">Ajustes de Workspace</div>
            <TabsTrigger value="general" className="justify-start gap-2">
              <LuSettings2 className="size-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="members" className="justify-start gap-2">
              <TbUsersGroup className="size-4" />
              Miembros
            </TabsTrigger>
            <TabsTrigger value="tags" className="justify-start gap-2">
              <AiOutlineTags className="size-4" />
              Etiquetas
            </TabsTrigger>
            <TabsTrigger value="variables" className="justify-start gap-2">
              <TbCodeVariable className="size-4" />
              Variables
            </TabsTrigger>
            <TabsTrigger value="integrations" className="justify-start gap-2">
              <VscDebugDisconnect className="size-4" />
              Integraciones
            </TabsTrigger>
            <TabsTrigger value="modules" className="justify-start gap-2">
              <GoDatabase className="size-4" />
              Bases de datos
            </TabsTrigger>
            <TabsTrigger value="widgets" className="justify-start gap-2">
              <BsChatDots className="size-4" />
              Widget
            </TabsTrigger>
          </div>

          <div className="flex flex-col gap-2 w-full ">
            <div className="font-semibold text-sm">Integraciones</div>
            <TabsTrigger value="whatsapp-settings" className="justify-start gap-2">
              <FaWhatsapp className="size-4" />
              Whatsapp
            </TabsTrigger>
            <TabsTrigger value="telegram-settings" className="justify-start gap-2">
              <PiTelegramLogoDuotone className="size-4" />
              Telegram
            </TabsTrigger>
            <TabsTrigger value="meta-settings" className="justify-start gap-2">
              <BsMeta className="size-4"/>
              Meta
            </TabsTrigger>
            <TabsTrigger value="instragram-settings" className="justify-start gap-2">
              <FaInstagram className="size-4"/>
              Instragram
            </TabsTrigger>
            <TabsTrigger value="tiktok-settings" className="justify-start gap-2">
              <RiTiktokLine className="size-4"/>
              Tiktok
            </TabsTrigger>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="font-semibold text-sm">Ajustes de plan</div>
            <TabsTrigger value="plans" className="justify-start gap-2">
              <FiCodesandbox className="size-4" />
              Planes
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="justify-start gap-2">
              <MdOutlinePayment className="size-4" />
              Subscripción
            </TabsTrigger>
          </div>
        </TabsList>
        {/*  */}

        {/*  */}
        <TabsContent className={'h-full flex flex-col'} value="profile">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.profile)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.profile)?.description || ''}
            />
            <DescriptionContentSettings />
            <div className="flex-1">
              <ProfileSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent className={'h-full flex flex-col'} value="general">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.general)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.general)?.description || ''}
            />
            <DescriptionContentSettings />
            <div className="flex-1">
              <GeneralWorkspaceSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="members">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.members)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.members)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <MembersSection
                list={[]}
                loading={false}
                hasError={false}
              />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="variables">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.variables)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.variables)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <VariablesSection
                list={[]}
                loading={false}
                hasError={false}
              />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="integrations">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.integrations)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.integrations)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <IntegrationSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="plans">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.plans)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.plans)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <PlansSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="subscriptions">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.subscriptions)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.subscriptions)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <SubscriptionSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="tags">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.tags)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.tags)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <TagsSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="modules">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.modules)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.modules)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <ModulesSection />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}

        {/*  */}
        <TabsContent value="widgets">
          <SettingsContentLayout>
            <TabHeaderDialogSettings
              title={settingsInfo.find(el => el.code == tabsSettings.widgets)?.title || ''}
              description={settingsInfo.find(el => el.code == tabsSettings.widgets)?.description || ''}
            />
            <DescriptionContentSettings />
            <div>
              <WidgetScreen />
            </div>
          </SettingsContentLayout>
        </TabsContent>
        {/*  */}
      </Tabs>
    </div>
  </>
}

export const DescriptionContentSettings = () => {
  return <>
    <div className="text-sm space-y-4 text-muted-foreground">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro assumenda totam reprehenderit incidunt pariatur harum minima, aliquam praesentium repudiandae quisquam.</p>
      <p>Lorem ipsum dolor sit amet consectetur <strong> adipisicing elit. Eum</strong></p>
    </div>
  </>
}