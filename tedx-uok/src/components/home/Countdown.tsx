import { useEffect, useState } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

interface props {
  date: string | null;
}

const Countdown = ({ date }: props) => {
  if (!date) return null;
  const eventDate = new Date(date);

  const calculateTimeLeft = (): TimeUnit[] => {
    const difference = eventDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return [
        { value: 0, label: "Days" },
        { value: 0, label: "Hours" },
        { value: 0, label: "Minutes" },
        { value: 0, label: "Seconds" },
      ];
    }

    return [
      { value: Math.floor(difference / (1000 * 60 * 60 * 24)), label: "Days" },
      {
        value: Math.floor((difference / (1000 * 60 * 60)) % 24),
        label: "Hours",
      },
      { value: Math.floor((difference / 1000 / 60) % 60), label: "Minutes" },
      { value: Math.floor((difference / 1000) % 60), label: "Seconds" },
    ];
  };

  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">
            Event Starts In
          </p>
        </div>

        <div className="flex justify-center gap-4 md:gap-8 lg:gap-12">
          {timeLeft.map((unit, index) => (
            <div key={unit.label} className="text-center">
              <div className="relative">
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 min-w-[70px] md:min-w-[100px] lg:min-w-[120px]">
                  <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tabular-nums">
                    {unit.value.toString().padStart(2, "0")}
                  </span>
                </div>
                {index < timeLeft.length - 1 && (
                  <span className="absolute -right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 text-2xl md:text-3xl text-muted-foreground font-light">
                    :
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
