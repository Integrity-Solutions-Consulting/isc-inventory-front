import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: RootLayout,
})

function RootLayout() {

  return (

    <Outlet />
  )
}
