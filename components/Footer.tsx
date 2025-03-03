import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ginkgo Devs</h3>
            <p className="mb-4">Transforming ideas into functional and attractive web solutions</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-green-300">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-green-300">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-green-300">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-green-300">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="hover:text-green-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-green-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-green-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-green-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
            <p>123 Web Dev Street</p>
            <p>Codeville, INT 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@ginkgodevs.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p>&copy; {new Date().getFullYear()} Ginkgo Devs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

