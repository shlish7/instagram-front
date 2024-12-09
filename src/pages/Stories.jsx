import React from 'react'
import { useParams } from 'react-router'

export function Stories() {

  const {userName} = useParams()

  return (
    <div>Stories</div>
  )
}