import { useState, useEffect } from 'react'

const locationHash = () =>
  decodeURIComponent(location.hash.replace(/^#/, '')) || ''

export const useHashChange = () => {
  const [hash, setHash] = useState(locationHash())

  useEffect(() => {
    const onHashchange = () => {
      setHash(locationHash())
    }
    window.addEventListener('hashchange', onHashchange)
    return () => {
      window.removeEventListener('hashchange', onHashchange)
    }
  })

  return [
    hash,
    value => {
      location.hash = encodeURIComponent(value)
    },
  ]
}
