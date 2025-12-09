import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './components/ui/provider.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/root.ts'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} /> */}
    </Provider>
  </StrictMode>,
)
