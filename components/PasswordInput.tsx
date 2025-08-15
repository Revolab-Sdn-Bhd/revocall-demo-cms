import React, {useState, useCallback} from 'react'
import {TextInput, Stack, Text} from '@sanity/ui'
import {StringInputProps, set, unset} from 'sanity'

// Simple hash function using built-in crypto (for demo purposes)
// In production, use bcrypt or similar server-side hashing
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hash))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const PasswordInput = React.forwardRef<HTMLInputElement, StringInputProps>((props, ref) => {
  const {onChange, value = ''} = props
  const [displayValue, setDisplayValue] = useState('')

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value
      setDisplayValue(inputValue)

      // Hash the password and update the field value
      if (inputValue) {
        try {
          const hashedValue = await hashPassword(inputValue)
          onChange(set(hashedValue))
        } catch (error) {
          console.error('Error hashing password:', error)
        }
      } else {
        onChange(unset())
      }
    },
    [onChange],
  )

  return (
    <Stack space={2}>
      <TextInput
        ref={ref}
        type="password"
        value={displayValue}
        onChange={handleChange}
        placeholder="Enter password"
      />
      {value && (
        <Text size={1} muted>
          Password is hashed: {value.substring(0, 16)}...
        </Text>
      )}
    </Stack>
  )
})

PasswordInput.displayName = 'PasswordInput'
