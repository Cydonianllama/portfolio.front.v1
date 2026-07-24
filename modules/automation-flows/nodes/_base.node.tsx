/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import { Component, ComponentClass, ComponentType, FunctionComponent, PropsWithChildren, ReactElement } from 'react'
import { colorDefaultNode } from "../_configs";
import { GoPlus } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { HiOutlineDotsHorizontal, HiOutlineDuplicate } from "react-icons/hi";
import { FlowHookActions } from "../hooks/action.hooks.flow";

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
}

export const BaseNode = ({ id, title, description, color, Icon, children, config, type = 'v1' }: PropsWithChildren<BaseNodeProps>) => {

  const flowActions = FlowHookActions({})

  const Factory: Record<versionTypes, FunctionComponent<PropsWithChildren<BaseNodeProps>>> = {
    v1: BaseNodev1,
    v2: BaseNodev1,
    v3: BaseNodev1,
  }

  return <>
    <Factory.v1 id={id} title={title} description={description} color={color} Icon={Icon} type='v1' config={config} >
      <div className="absolute bottom-[100%] h-[35%] left-1/2 -translate-x-1/2 hidden group-hover:block">
        <div className="h-[100%]">
          <ButtonGroup>
            <Button variant={'outline'} size={'icon-xs'}>
              <GoPlus />
            </Button>
            <Button variant={'outline'} size={'icon-xs'}>
              <HiOutlineDuplicate />
            </Button>
            <Button onClick={() => { flowActions.RemoveNodeAction({ id: id }) }} variant={'outline'} size={'icon-xs'}>
              <LuTrash2 />
            </Button>
            <Button variant={'outline'} size={'icon-xs'}>
              <HiOutlineDotsHorizontal />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {children}
    </Factory.v1>
  </>
}

const BaseNodev1 = ({ title, description, color, Icon, children, type = 'v1', config }: PropsWithChildren<BaseNodeProps>) => {

  const bgColor: Record<colorDefaultNode, { classColor: string }> = {
    blue: {
      classColor: 'bg-blue-500'
    },
    green: {
      classColor: 'bg-green-500'
    },
    yellow: {
      classColor: 'bg-yellow-500'
    },
    gray: {
      classColor: 'bg-gray-500'
    },
    red: {
      classColor: 'bg-red-500'
    },
    orange: {
      classColor: 'bg-orange-500'
    },
    purple: {
      classColor: 'bg-purple-500'
    },
    sky: {
      classColor: 'bg-sky-500'
    }
  }

  return <>
    <div className='border-2 border-gray-200 rounded-xl bg-white flex flex-col shadow-xl p-2 relative group'>
      <div className='flex items-start '>
        <div className='flex gap-2 justify-between'>
          <span className={`h-10 w-10 rounded-lg flex items-center justify-center ${bgColor[color].classColor}`}>
            <Icon className='text-white' />
          </span>
          <div className="pr-2 flex flex-col justify-center">
            <h2 className='font-semibold leading-4'>{title}</h2>
            <p className='text-gray-500 text-xs'>{description}</p>
          </div>
        </div>
      </div>
      <div className=''>
        <div>
          {children}
        </div>
      </div>
    </div>

    {config.hasSource && (<>
      <Handle
        type="source"
        position={Position.Right}
        style={{
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
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
          background: "#2563eb",
          border: "2px solid white",
          borderRadius: "50%",
        }}
      />
    </>)}

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