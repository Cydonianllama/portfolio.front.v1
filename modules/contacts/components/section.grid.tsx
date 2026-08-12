import { format } from 'date-fns';
import { LiaSitemapSolid } from "react-icons/lia";
import { CellContext } from "@tanstack/react-table";
import { ContactDTO } from '@/api/contacts/contacts.dto';
import { EmptyStateComponent } from '../shared/Empty';
import { SpinnerListing } from '../shared/Listing';
import { ErrorStateComponent } from '../shared/Error';
import { ActionsRow } from './section.table';
import { FaUser } from 'react-icons/fa';

export type SectionGridProps = {
  list: Array<ContactDTO>
  loading: boolean;
  hasError?: boolean;
  OnClickEmptyCreate?: () => void;
  OnClickRetry?: () => void;
}

const ActionsRowCell = ({ contact }: { contact: ContactDTO }) => {
  const cell = { row: { original: contact } } as unknown as CellContext<ContactDTO, unknown>;
  return <ActionsRow data={cell} />;
}

const RoomCard = ({ contact }: { contact: ContactDTO }) => {
  return (
    <div className="border rounded-lg p-3 flex flex-col gap-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-9 w-9 rounded-md border bg-mist-50 flex items-center justify-center text-sm text-muted-foreground shrink-0">
            <FaUser />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">{contact.fullname}</div>
            {contact.creationDate && (
              <div className="text-xs text-muted-foreground">
                {format(contact.creationDate, 'dd/MM/yyyy')}
              </div>
            )}
          </div>
        </div>
        <ActionsRowCell contact={contact} />
      </div>

      <div className="grid gap-1 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <span className="shrink-0">Celular:</span>
          <span className="truncate">{contact.mainPhone || '—'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <span className="shrink-0">Correo:</span>
          <span className="truncate">{contact.mainEmail || '—'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <span className="shrink-0">Dirección:</span>
          <span className="truncate">{contact.mainDirection || '—'}</span>
        </div>
      </div>

      {/* <ContactChatsBadges contact={contact} /> */}
    </div>
  )
}

export const SectionGrid = ({ list, loading, hasError, OnClickEmptyCreate, OnClickRetry }: SectionGridProps) => {
  return (<>
    {/* cargando data */}
    {(loading) && (<>
      <SpinnerListing
        title='Listando los items'
        description='Espere unos momentos mientras obtenemos los items'
      />
    </>)}

    {/* Estado de error  */}
    {(hasError && !loading) && (<>
      <ErrorStateComponent onClickRetry={OnClickRetry} />
    </>)}

    {(!loading && !hasError) && (<>

      {/* No hay data */}
      {list.length == 0 && (<>
        <EmptyStateComponent
          title='Items'
          description='No tenemos items registrados'
          isActiveCreate={true}
          onClickCreate={OnClickEmptyCreate}
          isActiveImport={false}
          isActiveLearn={false}
          mainIcon={<LiaSitemapSolid />}
        />
      </>)}

      {/* Hay data */}
      {list.length > 0 && (<>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {list.map((contact) => (
            <RoomCard key={contact.id} contact={contact} />
          ))}
        </div>
      </>)}

    </>)}
  </>)
}
