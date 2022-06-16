import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IMedicationItem } from '../../interfaces/medication.interface';

export interface EditMedicationItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IMedicationItem;
    mode: "add" | "edit";
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}