import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { BlogContextProvider } from '@/context/BlogContext'
import 'react-quill/dist/quill.snow.css'

export default function App({ Component, pageProps }) {
  return( 
  <BlogContextProvider>
  <Navbar />
  <Component {...pageProps} />

  </BlogContextProvider>)

}
