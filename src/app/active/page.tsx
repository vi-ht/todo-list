import React from 'react'
import dynamic from 'next/dynamic'
const Home = dynamic(() => import('../../app/page'), { ssr: false })


export default function ActivePage() {
  return (
    <Home/>
  )
}
