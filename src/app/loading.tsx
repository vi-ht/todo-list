"use client"
import React from 'react'
import Style from "./page.module.css"

export default function loading() {
  return (
    <div className={Style.loadingContainer}>
      <div className={Style.loading}></div>
    </div>
  )
}
