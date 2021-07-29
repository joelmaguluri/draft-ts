/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'

const font = [
    { fontName: 'Hahmlet', style: 'HAHMLET' },
    { fontName: 'Open Sans', style: 'OPENSANS' },
    { fontName: 'Roboto', style: 'ROBOTO' },
    { fontName: 'Style Script', style: 'STYLESCRIPT' }

]

export default function FontSelector(props: { editorState: { getCurrentInlineStyle: () => any; }; toggleFont: (arg0: string) => void; }) {
    var currentStyle = props.editorState.getCurrentInlineStyle();

    const [selected, setSelected] = useState(font[0].style)


    useEffect(() => {

        props.toggleFont(selected)
    }, [selected])


    return (
        <div className="fixed w-72 top-16">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block">{selected}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                                className="w-2 h-2 text-xs text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {font.map((font, fontIdx) => (
                                <Listbox.Option
                                    key={fontIdx}
                                    className={({ active }) =>
                                        `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                    }
                                    value={font.style}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`${selected ? 'font-medium bg-low-contrast-2 text-black font-extrabold' : 'font-normal'
                                                    } `}
                                            >
                                                {font.fontName}
                                            </span>

                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}