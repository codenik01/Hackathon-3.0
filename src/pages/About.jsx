import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Users,
  Brain,
  Shield,
  Zap,
  Eye,
  Cpu
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const About = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const teamMembers = [
    { name: "Kartik Shete", role: t("Team Leader") },
    { name: "Nikhil Chavan", role: t("Backend And Core") },
    { name: "Harsh Gautam", role: t("UI/UX Lead") },
    { name: "Purva Lad", role: t("UI") },
    { name: "Chanaksha Patil", role: t("RAG Engineer") }
  ];

  return (
    <div
      className={`relative min-h-screen overflow-hidden p-6 lg:p-12 transition-colors duration-300
      ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}
      `}
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"/>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"/>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-20 relative z-10"
      >

        {/* HEADER */}
        <motion.div variants={item} className="text-center space-y-6">

          <h1 className="text-sm font-bold tracking-[0.25em] text-indigo-500 uppercase">
            {t("Meet The Visionaries")}
          </h1>

          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            {t("THE INNOVATORS")}
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t(
              "A multidisciplinary team dedicated to revolutionizing education through AI-driven personalization."
            )}
          </p>
        </motion.div>

        {/* TEAM GRID */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {teamMembers.map((member, i) => (
            <motion.div
              variants={item}
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`p-6 rounded-2xl border backdrop-blur-xl text-center relative overflow-hidden group transition-all
              ${
                theme === "dark"
                  ? "bg-slate-800/40 border-slate-700"
                  : "bg-white border-slate-200 shadow-md"
              }`}
            >

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"/>

              <div className="relative">

                <div className="bg-indigo-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition">
                  <Users size={22} />
                </div>

                <h3 className="font-bold text-lg">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-500 font-medium mt-1">
                  {member.role}
                </p>

              </div>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition origin-left"/>
            </motion.div>
          ))}
        </motion.div>

        {/* CONTENT CONTAINER */}
        <motion.div
          variants={item}
          className={`p-10 md:p-14 rounded-3xl border space-y-14 backdrop-blur-xl
          ${
            theme === "dark"
              ? "bg-slate-900/40 border-slate-800"
              : "bg-white/80 border-slate-200"
          }`}
        >

          {/* INTRO */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="text-indigo-400"/>
              ASKYMYNOTES: The Future of Personalized Learning
            </h3>

            <p className="text-lg leading-relaxed text-slate-400">
              ASKYMYNOTES represents a paradigm shift in education. Traditional
              systems rely on static curriculum models that fail to adapt to
              individual learners. Our platform replaces that model with an
              adaptive AI learning ecosystem designed to personalize knowledge
              pathways dynamically.
            </p>

            <p className="text-lg leading-relaxed text-slate-400">
              Built by <strong className="text-indigo-400">THE INNOVATORS</strong>,
              this system merges intelligent content generation with
              structured learning architectures to create deeply personalized
              educational journeys.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`p-7 rounded-2xl border
              ${
                theme === "dark"
                  ? "bg-slate-950/60 border-slate-700"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <Zap className="text-yellow-400 mb-4 h-8 w-8"/>
              <h4 className="text-xl font-bold mb-2">Neural Optimization</h4>
              <p className="text-slate-500">
                Our AI analyzes dozens of behavioral signals to dynamically
                construct the most efficient learning sequence for each user.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`p-7 rounded-2xl border
              ${
                theme === "dark"
                  ? "bg-slate-950/60 border-slate-700"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <Shield className="text-emerald-400 mb-4 h-8 w-8"/>
              <h4 className="text-xl font-bold mb-2">Integrity First</h4>
              <p className="text-slate-500">
                Privacy-first AI architecture ensures complete transparency
                and data protection.
              </p>
            </motion.div>

          </div>

          {/* TECH */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Cpu className="text-pink-400"/>
              Hybrid Intelligence Architecture
            </h3>

            <p className="text-lg leading-relaxed text-slate-400">
              Our platform uses a hybrid architecture combining structured AI
              planning with dynamic content intelligence. The system analyzes
              professional goals and generates modular learning pathways,
              while a secondary engine produces real-time lessons and
              exercises tailored to the learner.
            </p>
          </div>

          {/* VISUAL DESIGN */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Eye className="text-cyan-400"/>
              Visual Intelligence
            </h3>

            <p className="text-lg leading-relaxed text-slate-400">
              The interface is engineered for deep focus. Layered backgrounds,
              subtle motion design, and dark-mode optimized palettes reduce
              cognitive load and allow learners to concentrate fully on
              knowledge acquisition.
            </p>
          </div>

          {/* FUTURE */}
          <div
            className={`p-8 rounded-2xl border-l-4 border-indigo-500
            ${
              theme === "dark"
                ? "bg-indigo-500/5"
                : "bg-indigo-50"
            }`}
          >

            <h3 className="text-xl font-bold mb-4 text-indigo-400">
              The Road Ahead
            </h3>

            <p className="text-lg leading-relaxed text-slate-400 italic">
              Our next phase introduces AI-powered peer groups, mentor
              matching, and real-time collaborative learning environments.
              We believe democratizing personalized education can unlock
              the next generation of innovators worldwide.
            </p>

          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;