import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ButtonVariant } from "../../models/button.model";


export interface EntityWorkspaceAction<T> {
  label?: string;
  variant?: ButtonVariant;
  icon?: IconDefinition;
  action: (entity: T) => void;
}
