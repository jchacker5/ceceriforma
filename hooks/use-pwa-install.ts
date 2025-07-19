'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export const usePWAInstall = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallModal, setShowInstallModal] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check for standalone mode (installed PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      // Check for iOS home screen app
      const isIOSInstalled = (window.navigator as any).standalone === true
      
      setIsInstalled(isStandalone || isIOSInstalled)
    }

    // Check if installation prompt should be shown
    const checkInstallPrompt = () => {
      // Don't show if already installed
      if (isInstalled) return

      // Check if user has previously dismissed the prompt
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      const dismissedDate = dismissed ? new Date(dismissed) : null
      const now = new Date()
      
      // Show again after 7 days
      if (dismissedDate) {
        const daysSinceDismissed = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceDismissed < 7) return
      }

      // Show after user has visited multiple times
      const visitCount = parseInt(localStorage.getItem('pwa-visit-count') || '0') + 1
      localStorage.setItem('pwa-visit-count', visitCount.toString())
      
      // Show modal after 2nd visit
      if (visitCount >= 2) {
        setTimeout(() => setShowInstallModal(true), 3000) // Show after 3 seconds
      }
    }

    checkIfInstalled()
    if (!isInstalled) {
      checkInstallPrompt()
    }

    // Listen for beforeinstallprompt event (Android Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      setShowInstallModal(false)
      localStorage.setItem('pwa-installed', 'true')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isInstalled])

  const installApp = async () => {
    if (!deferredPrompt) return false

    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true)
        setShowInstallModal(false)
      }
      
      setDeferredPrompt(null)
      setIsInstallable(false)
      
      return choiceResult.outcome === 'accepted'
    } catch (error) {
      console.error('Error installing app:', error)
      return false
    }
  }

  const dismissInstallModal = () => {
    setShowInstallModal(false)
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString())
  }

  const showInstallInstructions = () => {
    setShowInstallModal(true)
  }

  return {
    isInstallable,
    isInstalled,
    showInstallModal,
    installApp,
    dismissInstallModal,
    showInstallInstructions,
    canUseNativePrompt: !!deferredPrompt
  }
}