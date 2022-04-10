import { createContext, FC, useContext, useState } from 'react';
import { CreateContextOptions } from 'vm';

export interface Step {
    id: string
    label: string
    body: FC<any>
}

interface IWizardContext {
    steps: Step[]
    defaultStep: string
    selectedStep: Step
    selectedView: string[]
    setSelectedView: (value: string[]) => void
    next: () => void
    previous: () => void
    canNext: boolean
    canPrevious: boolean
}


export const WizardContext = createContext<IWizardContext | null>(null)

export const useWizard = () => useContext(WizardContext)!