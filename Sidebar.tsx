'use client'
import { useState, useMemo, useId, useRef, useEffect, type ReactElement } from 'react'
import { type DropdownProps, type DropdownOption } from './Dropdown.types'
import { dropdownTokens } from './Dropdown.tokens'
import { ChevronDownIcon } from '@/shared/assets/icons'
import { useClickOutside } from '@/shared/lib/hooks'

export const Dropdown = (props: DropdownProps): ReactElement => {
  const {
    label,
    placeholder = 'Select...',
    options = [],
    value: controlledValue,
    defaultValue,
    onChange,
    multiple = false,
    search,
    onSearchChange,
    size = 'md',
    disabled = false,
    required = false,
    errorMessage,
    classNames,
    renderItem,
    ariaLabel,
  } = props

  const autoId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [triggerWidth, setTriggerWidth] = useState<number>(0)

  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    defaultValue ?? (multiple ? [] : null)
  )
  const [isOpen, setIsOpen] = useState(false)

  const currentValue = controlledValue === undefined ? internalValue : controlledValue
  const hasError = Boolean(errorMessage)

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [isOpen])

  useClickOutside(
    [triggerRef, menuRef],
    () => {
      setIsOpen(false)
    },
    isOpen
  )

  const filteredOptions = useMemo(() => {
    if (!search || !onSearchChange) return options

    const searchLower = search.toLowerCase()

    return options.filter((option) => option.label.toLowerCase().includes(searchLower))
  }, [options, search, onSearchChange])

  const getSelectedOption = (): DropdownOption | null => {
    if (!currentValue || multiple) return null

    return options.find((opt) => opt.value === currentValue) ?? null
  }

  const getDisplayValue = (): string => {
    if (!currentValue) return placeholder

    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0) return placeholder

      const selectedOptions = options.filter((opt) => currentValue.includes(opt.value))

      return selectedOptions.map((opt) => opt.label).join(', ')
    }

    const selectedOption = getSelectedOption()

    return selectedOption?.label ?? placeholder
  }

  const isSelected = (optionValue: string): boolean => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.includes(optionValue)
    }

    return currentValue === optionValue
  }

  const handleSelect = (option: DropdownOption): void => {
    if (option.disabled) return

    let newValue: string | string[]

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : []

      newValue = currentArray.includes(option.value)
        ? currentArray.filter((v) => v !== option.value)
        : [...currentArray, option.value]
    } else {
      newValue = option.value
      setIsOpen(false)
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }

    if (onChange) {
      if (multiple && Array.isArray(newValue)) {
        const selectedOptions = options.filter((opt) => newValue.includes(opt.value))

        onChange(newValue, selectedOptions)
      } else if (!multiple && typeof newValue === 'string') {
        onChange(newValue, option)
      }
    }
  }

  const triggerClasses = ${dropdownTokens.trigger.base} ${dropdownTokens.trigger.sizes[size]} ${hasError ? dropdownTokens.trigger.states.error : dropdownTokens.trigger.states.default} ${dropdownTokens.trigger.states.disabled} ${classNames?.trigger ?? ''}

  const displayValue = getDisplayValue()
  const isPlaceholder = displayValue === placeholder
  const selectedOption = getSelectedOption()