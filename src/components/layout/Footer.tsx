
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-block font-bold text-xl">
              <span className="text-gradient">DisasterLens</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Forecasting and visualizing disaster risks to build safer futures.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:col-span-2">
            <div>
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link to="/predict" className="text-muted-foreground hover:text-primary transition-colors">
                    Prediction
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge" className="text-muted-foreground hover:text-primary transition-colors">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-muted-foreground hover:text-primary transition-colors">
                    Risk Map
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DisasterLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
