"use client";

import { useState, useEffect, Suspense } from "react";
import moment from "moment-timezone";
import { getTimeOfDay } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import morningIcon from "@/assets/daytime-icons/morning.svg";
import afternoonIcon from "@/assets/daytime-icons/afternoon.svg";
import eveningIcon from "@/assets/daytime-icons/evening.svg";
import nightIcon from "@/assets/daytime-icons/night.svg";

const FooterDay: React.FC = () => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const [location, setLocation] = useState<string>("Loading...");
  const [time, setTime] = useState<moment.Moment | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<string>("");

  useEffect(() => {
    const fetchLocationAndTime = async () => {
      try {
        const locationData = {
          city: "Louisville",
          timeZone: "America/New_York",
        };
        const currentTime = moment().tz(locationData.timeZone);

        setLocation(locationData.city);
        setTime(currentTime);
        setTimeOfDay(getTimeOfDay(currentTime));
      } catch (error) {
        console.error("Error fetching location or time:", error);
      }
    };

    fetchLocationAndTime();
  }, []);

  const renderSvg = () => {
    switch (timeOfDay) {
      case "morning":
        return (
          <Image src={morningIcon} alt="Morning Icon" width={12} height={12} />
        );
      case "afternoon":
        return (
          <Image
            src={afternoonIcon}
            alt="Afternoon Icon"
            width={12}
            height={13}
          />
        );
      case "evening":
        return (
          <Image src={eveningIcon} alt="Evening Icon" width={12} height={13} />
        );
      case "night":
        return (
          <Image src={nightIcon} alt="Night Icon" width={12} height={12} />
        );
      default:
        return null;
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        key={`${location}-${timeOfDay}`}
        className="flex items-center gap-2"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Suspense fallback={<div>Loading...</div>}>{renderSvg()}</Suspense>
        </motion.div>
        {time && (
          <motion.span
            className="text-body text-xs transition duration-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            {location}, {time.format("h")}
            <motion.span
              className="animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              :
            </motion.span>
            {time.format("mm A")}
          </motion.span>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FooterDay;
