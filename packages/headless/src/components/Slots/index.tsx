import {
    type FC,
    type PropsWithChildren,
    createContext,
    useContext,
} from 'react'

import { mergeProps } from './utils'

export type Slots = Record<string, Record<string, unknown>>

export const SlotContext = createContext<Slots>({})

export const SlotProvider: FC<PropsWithChildren<{ value: Slots }>> = ({
    value,
    children,
}) => {
    return <SlotContext.Provider value={value}>{children}</SlotContext.Provider>
}

export const useSlotProps = <T extends Record<string, unknown>>(
    props: T,
    slot: string,
) => {
    const context = useContext(SlotContext)
    const slotProps = context[slot] ?? {}

    return mergeProps(props, slotProps)
}
