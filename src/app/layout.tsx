"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from "./page.module.css"
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS + TS + MUI',
  description: 'Clone todolist project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.mainLayout}>
        <main>
          <div>
            <h1 className={styles.title}>Todos</h1>
            <div className={styles.mainLayoutVertical}>
              <div className={styles.container}>
                <RecoilRoot>
                  {children}
                </RecoilRoot >
              </div>
              <div className={styles.layerContainer} style={{ width: "97.5%", bottom: "-5px", zIndex: "-1" }}></div>
              <div className={styles.layerContainer} style={{ width: "95.5%", bottom: "-10px", zIndex: "-2" }}></div>
            </div>
          </div>
        </main>
      </body>
    </html>

  )
}
