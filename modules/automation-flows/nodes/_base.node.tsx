/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Handle,
  Position,
} from "@xyflow/react";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import { ComponentType, FunctionComponent, PropsWithChildren } from 'react'
import { bgColor } from "../registry/styles";
import { colorDefaultNode } from "../registry/types";
import { GoPlus } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { HiOutlineDotsHorizontal, HiOutlineDuplicate } from "react-icons/hi";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { useFlosStateMachineHookActions } from "../hooks/hook.state.machine";
import { automationFlowGenStore } from "../store/automation.flow.store";

type versionTypes = 'v1' | 'v2' | 'v3'

export type BaseNodeProps = {
  id: string;
  Icon: ComponentType<{ className: string }>;
  title: string;
  description?: string;
  color: colorDefaultNode
  type?: versionTypes,
  config: {
    hasSource: boolean,
    hasTarget: boolean
  }
  showActionsPopover?: boolean,
  isActive?: boolean
}

export const BaseNode = ({ isActive = false, id, title, description, color, Icon, children, config, type = 'v1', showActionsPopover = true }: PropsWithChildren<BaseNodeProps>) => {
  const { canEditGeneralFlowchart } = useFlosStateMachineHookActions({})
  const flowActions = useConversationalFlowGenActions({})
  const automationStore = automationFlowGenStore()

  const Factory: Record<versionTypes, FunctionComponent<PropsWithChildren<BaseNodeProps>>> = {
    v1: BaseNodev1,
    v2: BaseNodev1,
    v3: BaseNodev1,
  }

  return <>
    <Factory.v1 isActive={isActive} id={id} title={title} description={description} color={color} Icon={Icon} type='v1' config={config} >
      {(canEditGeneralFlowchart && showActionsPopover) && (
        <div style={{ top: -30 }} className={`absolute  h-[40px] left-1/2 -translate-x-1/2 hidden group-hover:block`}>
          <div className="h-full " >
            <ButtonGroup>
              <Button
                variant={'outline'}
                size={'icon-xs'}
                onClick={(e) => {
                  e.stopPropagation()
                  automationStore.setSelectNode({ openSelectNode: true })
                }}
              >
                <GoPlus />
              </Button>
              {/* <Button
                variant={'outline'}
                size={'icon-xs'}
                onClick={(e) => {
                  e.stopPropagation()

                }}
              >
                <HiOutlineDuplicate />
              </Button> */}
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  flowActions.RemoveNodeAction({ id: id })
                }}
                variant={'outline'}
                size={'icon-xs'}
              >
                <LuTrash2 />
              </Button>
              {/* <Button
                variant={'outline'}
                size={'icon-xs'}
                onClick={(e) => {
                  e.stopPropagation()

                }}
              >
                <HiOutlineDotsHorizontal />
              </Button> */}
            </ButtonGroup>
          </div>
        </div>
      )}
      {children}
    </Factory.v1>
  </>
}

const BaseNodev1 = ({ id, title, description, color, Icon, children, type = 'v1', config, isActive }: PropsWithChildren<BaseNodeProps>) => {
  return <>
    <div className={` ${isActive ? 'outline-blue-500 outline-2 -outline-offset-2 hover:outline-blue-600' : ''} border border-gray-300 rounded-xl bg-white flex flex-col p-2 relative group transition-colors hover:border-gray-400 focus-within:border-blue-500 w-[200px] max-w-[200px]`}>
      <div className='flex items-start relative'>

        <div className='flex gap-2 justify-between'>
          <span className={`h-10 w-10 rounded-lg flex items-center justify-center ${bgColor[color].classColor}`}>
            <Icon className={bgColor[color].textColor} />
          </span>
          <div className="pr-2 flex flex-col justify-center">
            <h2 className='font-semibold leading-4 text-foreground'>{title}</h2>
            <p className='text-gray-500 text-xs'>{description}</p>
          </div>
        </div>

        {config.hasSource && (<>
          <Handle
            id={`${id}`}
            type="source"
            position={Position.Right}
            style={{
              right: -10,
              width: 12,
              height: 12,
              background: "#2563eb",
              border: "2px solid white",
              borderRadius: "50%",
            }}
          />
        </>)}

        {config.hasTarget && (<>
          <Handle
            id={`${id}`}
            type="target"
            position={Position.Left}
            style={{
              left: -10,
              width: 12,
              height: 12,
              background: "#2563eb",
              border: "2px solid white",
              borderRadius: "50%",
            }}
          />
        </>)}

      </div>
      <div className=''>
        <div>
          {children}
        </div>
      </div>
    </div>



  </>
}

const BaseNodev2 = ({ title, description, color, Icon, children, type = 'v1' }: PropsWithChildren<BaseNodeProps>) => {
  return <>
    <div className='border rounded bg-white'>
      <div className='px-2'>
        <div className='flex gap-2 items-center'>
          {/* {icon} */}
          <span>{title}</span>
        </div>
        {description && (<span>{description}</span>)}
      </div>
      <div className='px-2'>
        {children}
      </div>
    </div>
  </>
}

const BaseNodev3 = ({ title, description, color, Icon, children, type = 'v1' }: PropsWithChildren<BaseNodeProps>) => {
  return <>
    <div className='border rounded bg-white'>
      <div className='px-2'>
        <div className='flex gap-2 items-center'>
          {/* {icon} */}
          <span>{title}</span>
        </div>
        {description && (<span>{description}</span>)}
      </div>
      <div className='px-2'>
        {children}
      </div>
    </div>
  </>
}