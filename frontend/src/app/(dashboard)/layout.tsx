// frontend/src/app/(dashboard)/layout.tsx
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotSidebar } from '@copilotkit/react-ui'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CopilotKit>
      <CopilotSidebar
        defaultOpen={true}  // Changed from defaultOpen
        labels={{
          title: "Agent Supervisor",
          initial: "Hi! I'm your agent supervisor. What would you like to accomplish?",
        }}
        clickOutsideToClose={false}
      >
        {children}
      </CopilotSidebar>
    </CopilotKit>
  )
}