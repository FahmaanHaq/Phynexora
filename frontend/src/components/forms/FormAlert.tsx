import { AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/lib/whatsapp";

export function FormAlert({ message, showWhatsApp = true }: { message: string; showWhatsApp?: boolean }) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2.5 text-sm text-fg">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
        {message}
      </p>
      {showWhatsApp && (
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#1fa855] hover:underline">
          <WhatsAppIcon className="h-4 w-4" /> Contact on WhatsApp
        </a>
      )}
    </div>
  );
}
