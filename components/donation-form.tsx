"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const presetAmounts = [25, 50, 100, 250]

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "MA",
    zip: "",
    occupation: "",
    employer: "",
  })
  const { toast } = useToast()

  const amount = selectedAmount || Number.parseFloat(customAmount) || 0

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      })
      return
    }

    if (amount > 1000) {
      toast({
        title: "Amount Too Large",
        description: "Maximum individual contribution is $1,000 per calendar year.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          donorInfo,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch {
      toast({
        title: "Error",
        description: "There was a problem processing your donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const requiresInfo = amount >= 200

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Select Amount</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={selectedAmount === preset ? "default" : "outline"}
              className={selectedAmount === preset ? "bg-campaign-blue hover:bg-campaign-blue/90" : ""}
              onClick={() => handleAmountSelect(preset)}
            >
              ${preset}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="custom-amount">Custom Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              max="1000"
              step="0.01"
              placeholder="0.00"
              className="pl-8"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            required
            value={donorInfo.name}
            onChange={(e) => setDonorInfo((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={donorInfo.email}
            onChange={(e) => setDonorInfo((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      {requiresInfo && (
        <>
          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              type="text"
              required
              value={donorInfo.address}
              onChange={(e) => setDonorInfo((prev) => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                type="text"
                required
                value={donorInfo.city}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                type="text"
                value={donorInfo.state}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, state: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                type="text"
                required
                value={donorInfo.zip}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, zip: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation *</Label>
              <Input
                id="occupation"
                type="text"
                required
                value={donorInfo.occupation}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, occupation: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employer">Employer *</Label>
              <Input
                id="employer"
                type="text"
                required
                value={donorInfo.employer}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, employer: e.target.value }))}
              />
            </div>
          </div>
        </>
      )}

      <Button
        type="submit"
        className="w-full bg-campaign-red hover:bg-campaign-red/90 text-lg py-6"
        disabled={isProcessing || amount < 1}
      >
        {isProcessing ? "Processing..." : `Donate $${amount.toFixed(2)}`}
      </Button>

      {requiresInfo && (
        <p className="text-sm text-gray-600">
          * Required for donations of $200 or more per Massachusetts campaign finance law
        </p>
      )}
    </form>
  )
}
