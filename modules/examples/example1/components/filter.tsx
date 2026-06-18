import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IoFilterSharp } from "react-icons/io5";
import { ChevronRight, ChevronLeft } from "lucide-react";

type FilterValue = {
  id: string;
  label: string;
};

type FilterOption = {
  id: string;
  label: string;
  values?: FilterValue[];
};

export type FilterProps = {
  options: FilterOption[];
  onSelect?: (filterId: string, valueId: string) => void;
};

export const Filter = ({ options, onSelect, }: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null);

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">
        <IoFilterSharp />
        Filtros
      </Button>}>

      </PopoverTrigger>

      <PopoverContent className="w-50 p-0">
        <Command className="">

          <CommandInput
            placeholder={
              selectedFilter
                ? `Buscar en ${selectedFilter.label}...`
                : "Buscar filtro..."
            }
          />

          <CommandList className="">
            <CommandEmpty>
              No encontrado.
            </CommandEmpty>

            {!selectedFilter && (
              <CommandGroup className="" heading="Filtros">
                {options.map((filter) => (
                  <CommandItem
                    className=" w-full flex justify-between "
                    key={filter.id}
                    onSelect={() => {
                      if (
                        filter.values &&
                        filter.values.length > 0
                      ) {
                        setSelectedFilter(filter);
                      }
                    }}
                  >
                    <span className="">{filter.label}</span>
                    <ChevronRight className=" absolute right-0 top-2" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {selectedFilter && (
              <CommandGroup
                heading={selectedFilter.label}
              >
                <CommandItem
                  onSelect={() =>
                    setSelectedFilter(null)
                  }
                >
                  <ChevronLeft className="mr-0 h-4 w-4" />
                  Volver
                </CommandItem>

                {selectedFilter.values?.map((value) => (
                  <CommandItem
                    key={value.id}
                    value={value.label}
                    onSelect={() => {
                      onSelect?.(
                        selectedFilter.id,
                        value.id
                      );
                    }}
                  >
                    {value.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>

        </Command>
      </PopoverContent>
    </Popover>
  );
};