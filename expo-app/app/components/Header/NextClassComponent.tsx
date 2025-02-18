import { AuthContext } from "@/app/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { GoogleCalendarEvent } from "@/app/utils/types";

interface NextClassComponentProps {
  calendarEvents: GoogleCalendarEvent[];
  style?: any;
  user: any;
}

export default function NextClassComponent({ calendarEvents, style }: NextClassComponentProps) {
  const auth = React.useContext(AuthContext);
  const user = auth?.user ?? null; 
  
  const [nextClass, setNextClass] = useState<GoogleCalendarEvent | null>(null);
  const [timeUntilNextClass, setTimeUntilNextClass] = useState<string | null>(null);
  useEffect(() => {
    if (!user) {
      setNextClass(null);
      setTimeUntilNextClass("Please login to see the next class");
      return;
    }

    if (!calendarEvents || calendarEvents.length === 0) {
      setNextClass(null);
      setTimeUntilNextClass("No classes scheduled for today.");
      return;
    }

    const upcomingOrOngoingClass = getNextClass(calendarEvents);
    if (upcomingOrOngoingClass) {
      setNextClass(upcomingOrOngoingClass);
      const timeDiff = getTimeUntilClass(
        upcomingOrOngoingClass.start.dateTime,
        upcomingOrOngoingClass.end.dateTime
      );
      setTimeUntilNextClass(timeDiff);
    } else {
      setNextClass(null);
      setTimeUntilNextClass("No classes scheduled for today.");
    }
  }, [calendarEvents, user]); 

  const getTimeUntilClass = (startTime: string, endTime: string): string => {
    const now = new Date();
    const classStart = new Date(startTime);
    const classEnd = new Date(endTime);

    if (classStart <= now && classEnd > now) {
      return `Class is ongoing (Started at ${classStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    }

    const timeDiffMs = classStart.getTime() - now.getTime();
    const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));

    if (timeDiffMinutes <= 0) {
      return `Class started ${Math.abs(timeDiffMinutes)} minutes ago`;
    } else if (timeDiffMinutes < 60 || timeDiffMinutes === 60) {
      return `Next class in ${timeDiffMinutes} minutes at ${classStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `Next class in ${Math.floor(timeDiffMinutes / 60)} hours at ${classStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const getNextClass = (events: GoogleCalendarEvent[]): GoogleCalendarEvent | null => {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const todayEvents = events.filter((event) => {
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      return (eventStart >= now || (eventStart <= now && eventEnd > now)) && eventStart <= endOfDay;
    });

    if (todayEvents.length === 0) return null;

    return todayEvents.sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime())[0];
  };

  return (
    <Text style={style}>
      {nextClass && timeUntilNextClass ? `${timeUntilNextClass} (${nextClass.summary})` : timeUntilNextClass}
    </Text>
  );
}
