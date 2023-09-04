"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGuideModal } from "@/hooks/use-guide-modal"
import { useParams, useRouter } from "next/navigation"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface GuideSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function GuideSwitcher({ className, items = [] }: GuideSwitcherProps) {
  const guideModal = useGuideModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentGuide = formattedItems.find((item) => item.value === params.guideId);

  const [open, setOpen] = React.useState(false)

  const onGuideSelect = (guide: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${guide.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a guide"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentGuide?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search guide..." />
            <CommandEmpty>No guide found.</CommandEmpty>
            <CommandGroup heading="Guides">
              {formattedItems.map((guide) => (
                <CommandItem
                  key={guide.value}
                  onSelect={() => onGuideSelect(guide)}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {guide.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentGuide?.value === guide.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  guideModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Guide
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
