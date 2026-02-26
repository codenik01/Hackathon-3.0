import React from 'react';
import SkillPrintSection from '../components/SkillPrintSection';
import { motion } from 'framer-motion';

const SkillPrintPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 px-6 pb-12 overflow-y-auto"
        >
            <SkillPrintSection isModal={false} />
        </motion.div>
    );
};

export default SkillPrintPage;
