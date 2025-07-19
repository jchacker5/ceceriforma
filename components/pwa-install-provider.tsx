'use client'

import React from 'react'
import { PWAInstallModal } from './pwa-install-modal'
import { usePWAInstall } from '@/hooks/use-pwa-install'

export const PWAInstallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showInstallModal, dismissInstallModal } = usePWAInstall()

  return (
    <>
      {children}
      <PWAInstallModal 
        isOpen={showInstallModal} 
        onClose={dismissInstallModal} 
      />
    </>
  )
}