import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IMedicalItem } from '../../interfaces/medical.interface';

export interface EditMedicalItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IMedicalItem;
    mode: "add" | "edit";
    updateItems: () => void;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}