import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IMedicationItem } from '../../interfaces/medication.interface';

export interface MedicationItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IMedicationItem;
    handleEditButton: () => void;
    updateItems: () => void;
}