import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SignUpProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
}