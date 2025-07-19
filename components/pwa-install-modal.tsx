'use client'

import React, { useState, useEffect } from 'react'
import { X, Share, Plus, MoreVertical, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PWAInstallModalProps {
  isOpen: boolean
  onClose: () => void
}

type DeviceType = 'ios-safari' | 'android-chrome' | 'desktop' | 'unsupported'

const detectDevice = (): DeviceType => {
  if (typeof window === 'undefined') return 'unsupported'
  
  const userAgent = window.navigator.userAgent.toLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(userAgent)
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent)
  const isAndroid = /android/.test(userAgent)
  const isChrome = /chrome/.test(userAgent)
  
  if (isIOS && isSafari) return 'ios-safari'
  if (isAndroid && isChrome) return 'android-chrome'
  if (!isIOS && !isAndroid) return 'desktop'
  
  return 'unsupported'
}

const IOSInstructions = () => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">Install Ceceri Campaign App</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Add this app to your home screen for quick access and a better experience!
      </p>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          1
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Tap the <Share className="inline w-4 h-4 mx-1" /> <strong>Share</strong> button at the bottom of your Safari browser
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          2
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Scroll down and tap <Plus className="inline w-4 h-4 mx-1" /> <strong>"Add to Home Screen"</strong>
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          3
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Tap <strong>"Add"</strong> to confirm and install the app
          </p>
        </div>
      </div>
    </div>
    
    <div className="text-center pt-2">
      <p className="text-xs text-muted-foreground">
        The app will appear on your home screen and work like a native app!
      </p>
    </div>
  </div>
)

const AndroidInstructions = () => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">Install Ceceri Campaign App</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Add this app to your home screen for quick access and a better experience!
      </p>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          1
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Tap the <MoreVertical className="inline w-4 h-4 mx-1" /> <strong>menu</strong> button (three dots) in your Chrome browser
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          2
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Tap <Download className="inline w-4 h-4 mx-1" /> <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          3
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Tap <strong>"Install"</strong> to confirm and add the app to your home screen
          </p>
        </div>
      </div>
    </div>
    
    <div className="text-center pt-2">
      <p className="text-xs text-muted-foreground">
        The app will appear on your home screen and work offline!
      </p>
    </div>
  </div>
)

const DesktopInstructions = () => (
  <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">Install Ceceri Campaign App</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Install this app for quick access from your desktop!
      </p>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          1
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Look for the <Download className="inline w-4 h-4 mx-1" /> <strong>install</strong> icon in your browser's address bar
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          2
        </div>
        <div className="flex-1">
          <p className="text-sm">
            Click the install icon and select <strong>"Install"</strong>
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          3
        </div>
        <div className="flex-1">
          <p className="text-sm">
            The app will be added to your applications and desktop
          </p>
        </div>
      </div>
    </div>
  </div>
)

const UnsupportedInstructions = () => (
  <div className="space-y-4 text-center">
    <h3 className="text-lg font-semibold">App Installation Not Available</h3>
    <p className="text-sm text-muted-foreground">
      App installation is not supported on this browser. For the best experience, please use:
    </p>
    <ul className="text-sm text-left space-y-1">
      <li>• Safari on iPhone/iPad</li>
      <li>• Chrome on Android</li>
      <li>• Chrome, Edge, or Safari on desktop</li>
    </ul>
  </div>
)

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('unsupported')

  useEffect(() => {
    setDeviceType(detectDevice())
  }, [])

  const renderInstructions = () => {
    switch (deviceType) {
      case 'ios-safari':
        return <IOSInstructions />
      case 'android-chrome':
        return <AndroidInstructions />
      case 'desktop':
        return <DesktopInstructions />
      case 'unsupported':
      default:
        return <UnsupportedInstructions />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="sr-only">Install App Instructions</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="px-2 pb-2">
          {renderInstructions()}
          
          <div className="flex gap-2 mt-6">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={onClose} className="flex-1">
              Got It!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}