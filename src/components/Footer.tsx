import { Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800/80 bg-[#0c0e12] py-6">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400 font-medium">
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-2 font-black uppercase tracking-wider text-white">
          <Dumbbell size={18} className="text-[#baff00]" />
          <span>FITLOG</span>
        </div>

        {/* Copyright Statement */}
        <p className="text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;