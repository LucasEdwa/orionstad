import { memo } from "react";
import type { ContactInfo } from "../../domain/entities/NavLink";
import { ButtonLink } from "../../../../components/ui";

interface ContactActionsProps {
  contactInfo: ContactInfo;
}

export const ContactActions = memo<ContactActionsProps>(({ contactInfo }) => {
  return (
    <ButtonLink to="/contact" className="w-[8.4375rem]">
      {contactInfo.getQuote}
    </ButtonLink>
  );
});
