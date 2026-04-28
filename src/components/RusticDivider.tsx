import { motion } from "framer-motion";

export default function RusticDivider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 py-2 ${className}`}
      initial={{ opacity: 0, scaleX: 0.5 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-osso-amber/40" />
      <svg width="20" height="20" viewBox="0 0 20 20" className="text-osso-amber/50">
        <path
          d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-osso-amber/40" />
    </motion.div>
  );
}
