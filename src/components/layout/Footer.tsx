import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-20 px-6 md:px-12 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="text-3xl font-black italic tracking-tighter text-primary mb-6 block font-headline">
            Impact Golf
          </span>
          <p className="text-on-surface-variant max-w-sm text-lg leading-relaxed">
            Redefining the legacy of golf. We turn every stroke into a catalyst for
            global good. Join the electric movement today.
          </p>
        </div>
        <div>
          <h4 className="font-headline font-bold text-lg mb-6">Navigation</h4>
          <ul className="space-y-4 font-body">
            <li>
              <Link href="/charities" className="text-on-surface-variant hover:text-primary transition-colors">
                Charities
              </Link>
            </li>
            <li>
              <Link href="/dashboard/draws" className="text-on-surface-variant hover:text-primary transition-colors">
                Draws
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/scores" className="text-on-surface-variant hover:text-primary transition-colors">
                Score Entry
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold text-lg mb-6">Platform</h4>
          <ul className="space-y-4 font-body">
            <li>
              <Link href="/subscribe" className="text-on-surface-variant hover:text-primary transition-colors">
                Subscribe
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="text-on-surface-variant hover:text-primary transition-colors">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                Support
              </Link>
            </li>
            <li>
              <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-on-surface-variant text-sm font-body">
          © 2024 Impact Golf. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm font-body text-on-surface-variant">
          <Link href="#" className="hover:text-on-surface transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-on-surface transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
