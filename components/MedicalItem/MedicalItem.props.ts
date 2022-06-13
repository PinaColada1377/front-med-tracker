import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IMedicalItem } from '../../interfaces/medical.interface';

export interface MedicalItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IMedicalItem;
    handleEditButton: () => void;
    
}