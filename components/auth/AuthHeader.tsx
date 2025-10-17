'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, LogIn, LogOut, ChevronDown, Download } from 'lucide-react'
import { useAuth } from '../../lib/auth-context'
import { AuthModal } from './AuthModal'
import { UserProfile } from './UserProfile'

export function AuthHeader() {
  const { user, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      setShowDropdown(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <>
      {/* Auth Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <motion.button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-pharma-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5" />
              <span>{user.email?.split('@')[0]}</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
              >
                <button
                  onClick={() => {
                    setShowUserProfile(true)
                    setShowDropdown(false)
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-pharma-primary rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </motion.button>
        )}

        {/* Brochure Download */}
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-pharma-primary transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-5 h-5" />
          <span>Brochure</span>
        </motion.button>

        {/* Contact Us Button */}
        <motion.button
          className="px-6 py-2 bg-white text-pharma-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <UserProfile
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  )
}
