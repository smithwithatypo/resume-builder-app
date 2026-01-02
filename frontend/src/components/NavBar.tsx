import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Summarize
            </Link>
            <Link
              to="/job-matcher"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/job-matcher" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Resume Matcher
            </Link>
            <Link
              to="/cover-letter"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/cover-letter" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Cover Letter
            </Link>
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
