import { OrgControl } from "@/app/(platform)/(dashboard)/organization/[organizationId]/_component/org-control"

const OrganizationIdLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default OrganizationIdLayout
