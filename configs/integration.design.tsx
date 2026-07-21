import { ReactElement } from "react";
import { FaWhatsapp } from "react-icons/fa";  
import { PiTelegramLogo } from "react-icons/pi";

export const IntegrationDesignConfiguration: Record<'whatsapp' | 'telegram', { icon: ReactElement }> =  {
  whatsapp: {
    icon:  <FaWhatsapp />
  },
  telegram: {
    icon: <PiTelegramLogo />
  }
}
