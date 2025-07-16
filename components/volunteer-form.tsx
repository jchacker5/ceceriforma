"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const volunteerTasks = [
  "Canvassing",
  "Phone Banking",
  "Event Support",
  "Digital Outreach",
  "Data Entry",
  "Fundraising",
  "Other",
]

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tasks: [] as string[],
    availability: "",
    message: "",
  })
  const { toast } = useToast()

  const handleTaskChange = (task: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      tasks: checked ? [...prev.tasks, task] : prev.tasks.filter((t) => t !== task),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Thank you for volunteering!",
          description: "We'll be in touch soon with volunteer opportunities.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          tasks: [],
          availability: "",
          message: "",
        })
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      <div className="space-y-3">
        <Label>Preferred Volunteer Activities</Label>
        <div className="grid grid-cols-2 gap-3">
          {volunteerTasks.map((task) => (
            <div key={task} className="flex items-center space-x-2">
              <Checkbox
                id={task}
                checked={formData.tasks.includes(task)}
                onCheckedChange={(checked) => handleTaskChange(task, checked as boolean)}
              />
              <Label htmlFor={task} className="text-sm font-normal">
                {task}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Input
          id="availability"
          placeholder="e.g., Weekends, Evenings, Flexible"
          value={formData.availability}
          onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Comments</Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your interests or experience..."
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        />
      </div>

      <Button type="submit" className="w-full bg-campaign-blue hover:bg-campaign-blue/90" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign Up to Volunteer"}
      </Button>
    </form>
  )
}
