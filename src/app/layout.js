import './globals.css'
import Providers from './state/provider'
import store from './state/store'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers store={store}>
          {children}
          <div id="notification-root"></div>
          <div id="modal-root"></div>
          <div id="confetti-root"></div>
        </Providers>
      </body>
    </html>
  )
}
