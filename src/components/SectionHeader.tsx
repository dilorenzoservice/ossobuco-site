import { motion } from "framer-motion";
import RusticDivider from "./RusticDivider";

interface Props {
  label: string;
  title: string;
  dividerClassName?: string;
}

export default function SectionHeader({ label, title, dividerClassName }: Props) {
  return (
    <>
      <motion.p
        className="text-osso-amber/90 text-sm uppercase tracking-[0.3em] font-medium text-center mb-4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        {label}
      </motion.p>
      <motion.h2
        className="font-display font-black text-osso-parchment text-center mb-3"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
        {title}
      </motion.h2>
      <RusticDivider className={dividerClassName} />
    </>
  );
}
