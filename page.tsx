'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { CodeEditor } from '@/components/code/CodeEditor'
import { ProjectManager } from '@/components/features/ProjectManager'
import { SettingsPanel } from '@/components/features/SettingsPanel'
import { HelpCenter } from '@/components/features/HelpCenter'
import { WelcomeModal } from '@/components/ui/WelcomeModal'
import { useChatStore } from '@/store/chatStore'
import { useSettingsStore } from '@/store/settingsStore'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [activeView, setActiveView] = useState<'chat' | 'code' | 'projects' | 'settings' | 'help'>('chat')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  
  const { currentChat } = useChatStore()
  const { theme, sidebarCollapsed } = useSettingsStore()

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
      setShowWelcome(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const handleViewChange = (view: typeof activeView) => {
    setActiveView(view)
  }

  const renderActiveView = () => {
    const viewVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    }

    switch (activeView) {
      case 'chat':
        return (
          <motion.div
            key="chat"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ChatInterface />
          </motion.div>
        )
      case 'code':
        return (
          <motion.div
            key="code"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <CodeEditor />
          </motion.div>
        )
      case 'projects':
        return (
          <motion.div
            key="projects"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ProjectManager />
          </motion.div>
        )
      case 'settings':
        return (
          <motion.div
            key="settings"
            variants={viewVariants}
            initial="initial"
            animate="animate"  
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <SettingsPanel />
          </motion.div>
        )
      case 'help':
        return (
          <motion.div
            key="help"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <HelpCenter />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(sidebarOpen && !sidebarCollapsed) && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0 border-r border-border bg-card/50 backdrop-blur-sm"
          >
            <Sidebar
              activeView={activeView}
              onViewChange={handleViewChange}
              onClose={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          activeView={activeView}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen && !sidebarCollapsed}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {renderActiveView()}
          </AnimatePresence>
        </main>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        open={showWelcome}
        onClose={() => setShowWelcome(false)}
      />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
