// components
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { ChevronRightIcon, CreditCardIcon, ShieldIcon, UserIcon, ExternalLinkIcon, MoreHorizontalIcon, SettingsIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { HelpCircleIcon } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BookOpenIcon, LinkIcon } from 'lucide-react'

const item = {
  label: "Documentation",
  description:
    "Find guides, API references, and examples to integrate with our platform.",
  link: "View docs",
  icon: (
    <BookOpenIcon aria-hidden="true" />
  ),
}


// max-w-lg

export const HomeScreenTest = () => {
  return (<>
    <div className="py-10 px-65 md:px-30 lg:px-65 sm:px-10 flex flex-col gap-5">

      {/*  */}
      <section className="flex justify-center w-full">
        <Card size="default" className="w-full  gap-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Your quick start guide</CardTitle>
            <Button variant="link">
              <HelpCircleIcon aria-hidden="true" />
              Help Center
            </Button>
          </CardHeader>
          <CardContent>
            <ItemGroup className="gap-0 pl-0">
              <Item render={<a href="#" />} size="xs">
                <ItemMedia variant="icon">
                  <UserIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Profile</ItemTitle>
                  <ItemDescription>Manage your account details</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="text-muted-foreground size-4" />
                </ItemActions>
              </Item>
              <ItemSeparator className={'my-0'} />
              <Item render={<a href="#" />} size="xs">
                <ItemMedia variant="icon">
                  <ShieldIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Security</ItemTitle>
                  <ItemDescription>Password and two-factor auth</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="text-muted-foreground size-4" />
                </ItemActions>
              </Item>
              <ItemSeparator className={'my-0'} />
              <Item render={<a href="#" />} size="xs">
                <ItemMedia variant="icon">
                  <CreditCardIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Billing</ItemTitle>
                  <ItemDescription>Plans, invoices, and payment</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="text-muted-foreground size-4" />
                </ItemActions>
              </Item>
              <ItemSeparator className={'my-0'} />
              <Item render={<a href="#" />} size="xs">
                <ItemMedia variant="icon">
                  <CreditCardIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Billing</ItemTitle>
                  <ItemDescription>Plans, invoices, and payment</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="text-muted-foreground size-4" />
                </ItemActions>
              </Item>
              <ItemSeparator className={'my-0'} />
              <Item render={<a href="#" />} size="xs">
                <ItemMedia variant="icon">
                  <CreditCardIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Billing</ItemTitle>
                  <ItemDescription>Plans, invoices, and payment</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="text-muted-foreground size-4" />
                </ItemActions>
              </Item>
            </ItemGroup>
          </CardContent>
        </Card>
      </section>
      {/*  */}

      {/*  */}
      <section className="flex justify-center w-full">
        <ItemGroup className="">
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Basic Item</ItemTitle>
              <ItemDescription>
                A simple item with title and description.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </section>
      {/*  */}

      {/*  */}
      <section className="flex justify-center w-full">
        <ItemGroup className="">
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>You are trying out the growth plan</ItemTitle>
              <ItemDescription>
                <Progress className={'py-2'} value={33} />
                <div className="text-muted-foreground text-xs">
                  21 days until the trial expires
                </div>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </section>
      {/*  */}


      {/*  */}
      <section className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-4 mx-auto">
        <Card className=" p-0">
          <CardContent className="p-0">
            <div className="border-b px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
                {item.link}
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="border-b px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
                {item.link}
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className=" p-0">
          <CardContent className="p-0">
            <div className="border-b px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
                {item.link}
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className=" p-0">
          <CardContent className="p-0">
            <div className="border-b px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
                {item.link}
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className=" p-0">
          <CardContent className="p-0">
            <div className="border-b px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
                {item.link}
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className=" p-0">
          <CardContent className="p-0">
            <div className="border-b px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <a
                href="#"
                className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
                {item.link}
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
      {/*  */}
    </div>
  </>)
}