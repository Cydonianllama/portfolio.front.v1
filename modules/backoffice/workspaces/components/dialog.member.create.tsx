/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateMemberSchema,
  RequestCreateMember,
} from "@/modules/backoffice/workspaces/schemas/member.creation";
import { GetUsers } from "@/modules/backoffice/users/services"
import { UserSelectionDTO } from "../models/dto"

export interface DialogMemberCreateConfig {
  workspaceId: string;
  onCreate: (data: RequestCreateMember) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  creating?: boolean;
}

export const DialogMemberCreate = (config: DialogMemberCreateConfig) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RequestCreateMember>({
    resolver: zodResolver(CreateMemberSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        email: '',
        rolId: '',
      });
      setSelectedUser(null);
    }
  }, [config.open, reset]);

  const HandleToCreate = async (data: RequestCreateMember) => {
    await config.onCreate(data);
  };

  const HandleToCancel = () => {
    config.setOpen(false);
  };

  // Dropdown users
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [listUsers, setListUsers] = useState<Array<UserSelectionDTO>>([]);
  const [selectedUser, setSelectedUser] = useState<UserSelectionDTO | null>(null);

  const GetListAction = async (query: string) => {
    try {
      setLoadingUsers(true);
      const req = await GetUsers({ page: 1, query: query });
      if (!req || !req.status || !req.data) {
        setListUsers([]);
        return;
      }
      setListUsers(req.data.list.map(el => ({
        email: el.email,
        id: el.id,
        name: el.fullname,
        profileURL: '',
        role: 'None'
      })));
    } catch (ex) {
      setListUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (config.open) {
      GetListAction('');
    }
  }, [config.open]);

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase())
      .join("");
  };

  const roles = [
    { id: "defaultRol::admin", name: "Admin" },
    { id: "defaultRol::agente", name: "Agente" },
  ];

  const currentRole = roles.find((r) => r.id === watch("rolId")) || null;

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Agregar miembro</DialogTitle>
          <DialogDescription>
            Invita a un nuevo miembro al workspace.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Buscar usuario</Label>
            <Combobox
              items={listUsers}
              value={selectedUser}
              onValueChange={(item: any) => {
                if (item) {
                  setSelectedUser(item);
                  setValue("email", item.email, { shouldValidate: true, shouldDirty: true });
                }
              }}
              itemToStringValue={(member: UserSelectionDTO) => member.name}
            >
              <ComboboxTrigger
                render={
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                  />
                }
              >
                <ComboboxValue>
                  {(member: UserSelectionDTO | null) =>
                    member ? (
                      <span className="flex items-center gap-2">
                        <Avatar className="size-5">
                          <AvatarImage src={member.profileURL} alt={member.name} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Buscar usuario...</span>
                    )
                  }
                </ComboboxValue>
              </ComboboxTrigger>
              <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
                <ComboboxInput
                  showTrigger={false}
                  placeholder="Buscar usuario..."
                  onChange={(text: any) => {
                    GetListAction(text.target.value);
                  }}
                />
                {loadingUsers && (
                  <div className="px-2 py-3 text-sm text-muted-foreground">Buscando...</div>
                )}
                {!loadingUsers && (
                  <>
                    <ComboboxEmpty>No se encontraron usuarios.</ComboboxEmpty>
                    <ComboboxList>
                      {(member: UserSelectionDTO) => (
                        <ComboboxItem key={member.id} value={member}>
                          <Item size="xs" className="p-0">
                            <Avatar className="size-6">
                              <AvatarImage src={member.profileURL} alt={member.name} />
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <ItemContent>
                              <ItemTitle className="whitespace-nowrap">{member.name}</ItemTitle>
                              <ItemDescription>{member.email}</ItemDescription>
                            </ItemContent>
                          </Item>
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field>
            <Label>Email</Label>
            <Input
              placeholder="email@ejemplo.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </Field>

          <Field>
            <Label>Rol</Label>
            <Combobox
              items={roles}
              value={currentRole}
              onValueChange={(item: any) => {
                if (item) {
                  setValue("rolId", item.id, { shouldValidate: true, shouldDirty: true });
                }
              }}
              itemToStringValue={(item: any) => item.name}
            >
              <ComboboxTrigger
                render={
                  <Button variant="outline" className="w-full justify-between font-normal" />
                }
              >
                <ComboboxValue>
                  {(item: any) =>
                    item ? (
                      <span>{item.name}</span>
                    ) : (
                      <span className="text-muted-foreground">Seleccionar rol</span>
                    )
                  }
                </ComboboxValue>
              </ComboboxTrigger>
              <ComboboxContent>
                <ComboboxEmpty>No se encontraron roles.</ComboboxEmpty>
                <ComboboxList>
                  {(item: any) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            {errors.rolId && (
              <p className="text-sm text-red-500">{errors.rolId.message}</p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Agregar miembro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
